import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GenerateThumbnailProps } from "@/types";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAIThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { toast } = useToast();

  const imageRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage("");
    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({ title: "Thumbnail generated successfully" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error generating thumbnail",
        variant: "destructive",
      });
    }
  };
  const generateImage = async () => {};
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
      console.log(blob)
      handleImage(blob, file.name)
    } catch (error) {
      toast({
        title: "Error uploading image",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="generate_thumbnail">
        <Button
          onClick={() => setIsAIThumbnail(true)}
          type="button"
          variant="plain"
          className={cn("", {
            "bg-black-6 hover:bg-black-9": isAiThumbnail,
          })}
        >
          Use AI to generate Thumbnail
        </Button>
        <Button
          onClick={() => setIsAIThumbnail(false)}
          type="button"
          variant="plain"
          className={cn("", {
            "bg-black-6 hover:bg-black-9": !isAiThumbnail,
          })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompts to generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Provide text to generate Thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            ></Textarea>
          </div>
          <div className=" w-full max-w-[200px]">
            <Button
              type="submit"
              className="text-16  bg-orange-1 py-4 font-bold text-white-1 hover:bg-black-1"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  <Loader size={20} className="animate-spin ml-2"></Loader>
                  Generating
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="image_div"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            ref={imageRef}
            onChange={uploadImage}
            className="hidden"
          ></Input>
          {!isImageLoading ? (
            <>
              <Image
                src="/icons/upload-image.svg"
                width={40}
                height={40}
                alt="upload"
              ></Image>
            </>
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              Uploading
              <Loader size={20} className="animate-spin ml-2"></Loader>
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to Upload</h2>{" "}
            <p className="text-12 font-normal text-gray-1">
              svg, png, jpeg or even gif (nax, 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            width={150}
            height={20}
            className="mt-5"
            alt="thumbnail"
          ></Image>
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;

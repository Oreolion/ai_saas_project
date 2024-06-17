import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const document = await ctx.db.query("tasks").collect();
    return document
  },
});
"use client";

import { Comments } from "@fuma-comment/react";
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

const signIn = () => {
  void authClient.signIn.social({
    provider: "github",
  });
};

interface CommentsProps {
  pageId: string;
}

export function BlogComments({ pageId }: CommentsProps) {
  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-lg font-semibold mb-4">评论</h3>
      <Comments
        page={pageId}
        className="max-w-full w-full"
        auth={{
          type: "api",
          signIn,
        }}
      />
    </div>
  );
}

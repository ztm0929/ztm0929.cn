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
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-xl font-semibold mb-6 text-foreground">评论</h3>
      <div className="not-prose w-full fuma-comment-container">
        <Comments
          page={pageId}
          className="w-full max-w-none fuma-comment"
          style={{
            width: '100%',
            maxWidth: 'none'
          }}
          auth={{
            type: "api",
            signIn,
          }}
        />
      </div>
    </div>
  );
}

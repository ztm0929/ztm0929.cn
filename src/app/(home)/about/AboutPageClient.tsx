"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import { siWechat, siTelegram, siGmail } from "simple-icons";

export default function AboutPageClient() {
  const [showWechatQR, setShowWechatQR] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center gap-4">
      <FadeIn delay={0}>
        <Image
          src="/avatar.png"
          alt="天明的头像"
          width={150}
          height={150}
          className="rounded-full mb-4"
          priority
        />
      </FadeIn>

      <FadeIn delay={200}>
        <h1 className="text-2xl font-bold">👋 Hi，我叫『 天明 』</h1>
      </FadeIn>

      <FadeIn delay={400}>
        <p>英文名是 Kevin，网名是 @ztm0929</p>
      </FadeIn>

      <FadeIn delay={600}>
        <p>
          <Link
            href="https://www.16personalities.com/ch/enfp-%E4%BA%BA%E6%A0%BC"
            className="text-fd-foreground underline"
          >
            ENFP
          </Link>{" "}
          &{" "}
          <Link
            href="https://zh.wikipedia.org/wiki/%E6%B3%A8%E6%84%8F%E5%8A%9B%E4%B8%8D%E8%B6%B3%E9%81%8E%E5%8B%95%E7%97%87"
            className="text-fd-foreground underline"
          >
            ADHD
          </Link>{" "}
          &{" "}
          <Link
            href="https://zh.wikipedia.org/wiki/%E9%9B%99%E7%9B%B8%E9%9A%9C%E7%A4%99"
            className="text-fd-foreground underline"
          >
            BD (maybe)
          </Link>
        </p>
      </FadeIn>

      <FadeIn delay={800}>
        <p className="mb-4">
          网络新媒体学生， 人力资源（服务）学习者， 编程小白
        </p>
      </FadeIn>

      <FadeIn delay={800}>
        <div className="w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[800px] mx-auto mb-8 overflow-hidden">
          <Image
            src="http://ghchart.rshah.org/ztm0929"
            alt="ztm0929 Github chart"
            width={800}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </FadeIn>

      <FadeIn delay={1000}>
        <section className="w-full max-w-2xl pt-2" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="mb-4 text-center text-xl font-semibold">
            联系方式
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setShowWechatQR(true)}
              aria-label="查看微信二维码（微信号：ztm00929）"
              className="group flex min-h-24 cursor-pointer items-center gap-3 rounded-lg border border-fd-border bg-fd-card p-4 text-left text-fd-card-foreground shadow-sm transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
            >
              <svg
                className="size-6 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-fd-accent-foreground"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={siWechat.path} fill="currentColor" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">微信</span>
                <span className="block truncate text-xs leading-5 text-fd-muted-foreground group-hover:text-fd-accent-foreground">
                  ztm00929
                </span>
              </span>
            </button>

            <Link
              href="https://t.me/ztm0929"
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-24 cursor-pointer items-center gap-3 rounded-lg border border-fd-border bg-fd-card p-4 text-left text-fd-card-foreground shadow-sm transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
            >
              <svg
                className="size-6 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-fd-accent-foreground"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={siTelegram.path} fill="currentColor" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">Telegram</span>
                <span className="block truncate text-xs leading-5 text-fd-muted-foreground group-hover:text-fd-accent-foreground">
                  t.me/ztm0929
                </span>
              </span>
            </Link>

            <Link
              href="mailto:ztm0929@outlook.com"
              className="group flex min-h-24 cursor-pointer items-center gap-3 rounded-lg border border-fd-border bg-fd-card p-4 text-left text-fd-card-foreground shadow-sm transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
            >
              <svg
                className="size-6 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-fd-accent-foreground"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={siGmail.path} fill="currentColor" />
              </svg>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">邮箱</span>
                <span className="block truncate text-xs leading-5 text-fd-muted-foreground group-hover:text-fd-accent-foreground">
                  ztm0929@outlook.com
                </span>
              </span>
            </Link>
          </div>
        </section>
      </FadeIn>

      {showWechatQR && (
        <div
          className="fixed inset-0 bg-fd-overlay flex items-center justify-center z-50"
          onClick={() => setShowWechatQR(false)}
        >
          <div
            className="bg-fd-card p-8 rounded-lg shadow-lg max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/wechat-qrcode.jpg"
              alt="微信二维码"
              width={280}
              height={280}
              className="mx-auto mb-6"
              priority
            />
            <p className="text-fd-muted-foreground text-center mb-4 text-sm">
              请备注您的需求，谢谢！
            </p>
            <button
              onClick={() => setShowWechatQR(false)}
              className="w-full px-4 py-3 border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors font-medium rounded"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

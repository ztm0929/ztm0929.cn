"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

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
        <p className="mb-4">网络新媒体学生， 人力资源（服务）学习者， 编程小白</p>
      </FadeIn>
      
      <FadeIn delay={1000}>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">联系方式：</h1>
          <button
            onClick={() => setShowWechatQR(true)}
            className="text-fd-foreground underline cursor-pointer bg-transparent border-none p-0 font-inherit"
          >
            微信：ztm00929
          </button>
          <Link href="https://t.me/ztm0929">Telegram（TG）：ztm0929</Link>
          <Link href="mailto:ztm0929@outlook.com">邮箱：ztm0929@outlook.com</Link>
        </div>
      </FadeIn>
      
      {showWechatQR && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowWechatQR(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4"
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
            <p className="text-gray-600 text-center mb-4 text-sm">
              请备注您的需求，谢谢！
            </p>
            <button
              onClick={() => setShowWechatQR(false)}
              className="w-full px-4 py-3 bg-gray-200 rounded hover:bg-gray-300 text-black transition-colors font-medium"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
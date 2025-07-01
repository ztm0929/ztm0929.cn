import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center gap-4">
      <h1 className="text-2xl font-bold">👋 Hi，我叫天明</h1>
      <p>英文名是 Kevin，网名是 @ztm0929</p>
      <p>
        <Link href="https://www.16personalities.com/ch/enfp-%E4%BA%BA%E6%A0%BC" className="text-fd-foreground underline">
          ENFP
        </Link>{" "}
        &{" "}
        <Link href="https://zh.wikipedia.org/wiki/%E6%B3%A8%E6%84%8F%E5%8A%9B%E4%B8%8D%E8%B6%B3%E9%81%8E%E5%8B%95%E7%97%87" className="text-fd-foreground underline">
          ADHD
        </Link>
      </p>
      <p>网络新媒体学生， 人力资源（服务）学习者， 编程新手</p>
    </div>
  );
}

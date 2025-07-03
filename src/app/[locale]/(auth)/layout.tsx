import Image from "next/image";
import { Carousel } from "antd";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const contents = [
    {
      title: "Đầu Tư Bạc Dễ Dàng",
      subtitle: "Thanh Khoản Nhanh Chóng",
      description: "Bạc số hóa giúp bạn giao dịch mọi lúc, mọi nơi, minh bạch & an toàn.",
      images: "/images/login/bg-login.png",
    },
    {
      title: "Đầu Tư Bạc Dễ Dàng",
      subtitle: "Thanh Khoản Nhanh Chóng",
      description: "Bạc số hóa giúp bạn giao dịch mọi lúc, mọi nơi, minh bạch & an toàn.",
      images: "/images/login/bg-login.png",
    },
    {
      title: "Đầu Tư Bạc Dễ Dàng",
      subtitle: "Thanh Khoản Nhanh Chóng",
      description: "Bạc số hóa giúp bạn giao dịch mọi lúc, mọi nơi, minh bạch & an toàn.",
      images: "/images/login/bg-login.png",
    },
    {
      title: "Đầu Tư Bạc Dễ Dàng",
      subtitle: "Thanh Khoản Nhanh Chóng",
      description: "Bạc số hóa giúp bạn giao dịch mọi lúc, mọi nơi, minh bạch & an toàn.",
      images: "/images/login/bg-login.png",
    },
    {
      title: "Đầu Tư Bạc Dễ Dàng",
      subtitle: "Thanh Khoản Nhanh Chóng",
      description: "Bạc số hóa giúp bạn giao dịch mọi lúc, mọi nơi, minh bạch & an toàn.",
      images: "/images/login/bg-login.png",
    },
  ];
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex h-[100svh] md:bg-white">
        <div className="relative h-full w-full overflow-hidden overflow-y-scroll p-6 md:px-20 md:py-20 lg:w-1/2 lg:overflow-hidden">
          <div
            className="absolute top-0 left-0 h-[600px] w-full md:top-10 md:left-48"
            // aria-hidden="true"
          >
            <Image
              src="/images/login/bg-triangle.svg"
              alt=""
              fill
              style={{
                objectFit: "cover",
                transform: "scale(1.2)",
                objectPosition: "32% 20%",
                opacity: 1,
              }}
              priority
              sizes="100vw"
            />
          </div>
          <div
            className="absolute bottom-0 -left-48 hidden h-[400px] w-full lg:block"
            aria-hidden="true"
          >
            <Image
              src="/images/login/bg-triangle-bottom.svg"
              alt=""
              fill
              style={{
                objectFit: "cover",
                opacity: 1,
                zIndex: -10,
              }}
              priority
            />
          </div>
          <div className="flex w-full items-center gap-4 md:pt-10">
            <Image
              src="/images/vindas.svg"
              alt="vindas-icon"
              priority
              width={55}
              height={55}
            />
            <Image
              src="/images/vindas-text.svg"
              alt="vindas-text"
              priority
              width={140}
              height={40}
            />
          </div>
          <div className="!z-20">{children}</div>
        </div>
        <div className="relative top-0 hidden h-full w-1/2 lg:block">
          <Carousel
            autoplay={{ dotDuration: true }}
            autoplaySpeed={5000}
            arrows
            className="h-full w-full rounded-l-2xl"
          >
            {contents.map((content, index) => (
              <div
                key={index}
                className="relative h-full w-full rounded-l-2xl"
              >
                <img
                  src={content.images}
                  alt={content.title}
                  className="h-screen w-full rounded-l-2xl object-cover"
                />
                <div className="absolute bottom-20 flex w-full flex-col items-center text-white">
                  <p className="text-center text-2xl font-semibold uppercase">{content.title}</p>
                  <p className="text-center text-2xl font-bold uppercase">{content.subtitle}</p>
                  <p className="text-md max-w-80 pt-4 text-center font-bold">{content.description}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

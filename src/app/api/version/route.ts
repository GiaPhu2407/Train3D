import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_COMMIT_SHA ||
    "v2-prod-build";

  const deploymentId =
    process.env.VERCEL_DEPLOYMENT_ID ||
    process.env.VERCEL_URL ||
    "dpl-vercel-latest";

  const env = process.env.VERCEL_ENV || "production";

  return NextResponse.json({
    version: "2.0.0",
    title: "Bản Cập Nhật V2.0 - Đường Sắt Hoàng Gia & Tính Năng Mới",
    buildId: deploymentId,
    commitSha: commitSha.substring(0, 7),
    fullCommitSha: commitSha,
    env,
    timestamp: new Date().toISOString(),
    features: [
      "Giao diện V2.0 Royal Express siêu sang trọng hoàn toàn mới",
      "Bảng điều độ tàu chạy trực tiếp & Live Train Radar GPS",
      "Khám phá Toa Tàu & Cabin Suite 360° với mô phỏng view cửa sổ",
      "Đặt trước ẩm thực 5 sao cung đình trên tàu",
      "Lịch tìm vé giá tốt nhất theo ngày",
      "Tra cứu vé PNR & Thẻ lên tàu điện tử Digital QR Boarding Pass",
      "Trạm âm thanh đường sắt thư giãn ASMR & Nhạc du dương",
    ],
  });
}

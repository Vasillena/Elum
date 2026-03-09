/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBreakpoints } from "@/app/utils/useBreakpoints";
import { useThree } from "@react-three/fiber";

export default function ResponsiveGroup({ children }: any) {
  const { size } = useThree();
  const { down } = useBreakpoints();

  const isMobile = down("sm");

  const baseWidth = isMobile ? 700 : 1500;

  const xlWidth = 1280;
  const maxScale = xlWidth / baseWidth;

  const scale = Math.min(size.width / baseWidth, maxScale);

  return <group scale={[scale, scale, scale]}>{children}</group>;
}

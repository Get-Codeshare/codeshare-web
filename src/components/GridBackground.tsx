export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 z-[-1] h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"
      aria-hidden="true"
    />
  );
}
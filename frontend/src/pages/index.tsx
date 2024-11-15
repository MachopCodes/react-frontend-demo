import { UploadButton } from "~/components/UploadButton";

export default function MainPage() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center">
      <div className="space-y-2">
        <p>Hello Good luck!</p>
        <p>Read the README.md very carfully.</p>
        <UploadButton></UploadButton>
      </div>
    </div>
  );
}

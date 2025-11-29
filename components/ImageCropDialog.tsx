import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from "./ui/shadcn-io/image-crop";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

interface PropsType {
  selectedFile: File;
  setCroppedImage: Dispatch<SetStateAction<string | undefined>>;
  handleReset: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ImageCropDialog = ({
  selectedFile,
  setCroppedImage,
  handleReset,
  setOpen,
  open,
}: PropsType) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>Crop you avatar image.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex justify-center items-center flex-col">
          <ImageCrop
            aspect={1}
            file={selectedFile}
            circularCrop
            maxImageSize={1024 * 1024} // 1MB
            onCrop={setCroppedImage}
          >
            <ImageCropContent className="max-w-md" />
            <div className="flex items-center gap-2">
              <ImageCropApply
                onClick={() => {
                  setOpen(false);
                }}
              />
              <ImageCropReset />
              <Button
                onClick={handleReset}
                size="icon"
                type="button"
                variant="ghost"
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          </ImageCrop>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;

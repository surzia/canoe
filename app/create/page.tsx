import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

export default function CreatePage() {
  return (
    <>
      <Button>Save</Button>
      <Input
        key="outside"
        type="text"
        label="Title"
        labelPlacement="outside"
        placeholder="Story title"
      />
      <Textarea
        label="Content"
        labelPlacement="outside"
        placeholder="Story content"
        className="max-w-full my-5"
      />
    </>
  );
}

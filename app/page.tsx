import { Card, CardBody } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <Card className="my-1">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-center">
        <Pagination total={10} initialPage={1} />
      </div>
    </>
  );
}

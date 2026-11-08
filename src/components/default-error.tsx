import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function DefaultError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <div className="container-page py-24">
      <h1 className="text-3xl">This page couldn’t load.</h1>
      <Button
        className="mt-6"
        onClick={async () => {
          await router.invalidate();
          reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
}

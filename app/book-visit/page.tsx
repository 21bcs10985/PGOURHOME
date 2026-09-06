import VisitRequestForm from "@/components/visit/VisitRequestForm";

export default function BookVisitPage() {
  return (
    <div className="max-w-[800px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-4xl">
        <h1 className="text-headline-md text-primary mb-sm">Book a Visit</h1>
        <p className="text-body-lg text-on-surface-variant">
          Schedule a free visit to tour our rooms and facilities. No commitment required.
        </p>
      </div>
      <div className="bg-surface-container-lowest rounded-2xl shadow-level-1 p-xl md:p-2xl">
        <VisitRequestForm />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { RoomFilters } from "@/types";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

interface RoomFiltersProps {
  filters: RoomFilters;
  onChange: (filters: RoomFilters) => void;
}

const roomTypeOptions = [
  { value: "", label: "All Types" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double Sharing" },
  { value: "triple", label: "Triple Sharing" },
];

export default function RoomFiltersPanel({ filters, onChange }: RoomFiltersProps) {
  const [local, setLocal] = useState<RoomFilters>(filters);

  const apply = () => onChange({ ...local, page: 1 });
  const reset = () => {
    const empty: RoomFilters = {};
    setLocal(empty);
    onChange(empty);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-level-1 p-xl flex flex-col gap-lg">
      <h3 className="text-title-lg text-primary font-semibold">Filters</h3>

      <Select
        label="Room Type"
        options={roomTypeOptions}
        value={local.roomType ?? ""}
        onChange={(e) =>
          setLocal((p) => ({ ...p, roomType: e.target.value as RoomFilters["roomType"] }))
        }
      />

      <div className="flex gap-sm">
        <Input
          label="Min Price (₹)"
          type="number"
          placeholder="0"
          value={local.minPrice ?? ""}
          onChange={(e) => setLocal((p) => ({ ...p, minPrice: e.target.value }))}
        />
        <Input
          label="Max Price (₹)"
          type="number"
          placeholder="50000"
          value={local.maxPrice ?? ""}
          onChange={(e) => setLocal((p) => ({ ...p, maxPrice: e.target.value }))}
        />
      </div>

      <div className="flex gap-sm">
        <Button onClick={apply} className="flex-1">
          Apply
        </Button>
        <Button variant="ghost" onClick={reset} className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
}

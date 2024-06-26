import { BitmapEntity } from '@/utils/bitmap/types';
import { CheckBox } from '../CheckBox';
import { useCallback, useMemo } from 'react';
import { isEqualArrays } from './utils';
import { useFormContext } from 'react-hook-form';

interface SelectBitmapProps {
  name: string;
  bitmaps: BitmapEntity[];
  className?: string;
}

export const SelectBitmap = ({ name, bitmaps, className }: SelectBitmapProps) => {
  const { watch, setValue, register } = useFormContext();

  const selectedIds = watch(name);
  const allIds = useMemo(() => bitmaps.map((it) => it.id), [bitmaps]);
  const isSelectedAll = isEqualArrays(selectedIds, allIds);
  const toggleSelectAll = useCallback(() => {
    setValue(name, isSelectedAll ? [] : allIds);
  }, [allIds, isSelectedAll, name, setValue]);

  return (
    <div className={className}>
      <CheckBox label="Select all" checked={isSelectedAll} onChange={toggleSelectAll} />
      <hr />
      {bitmaps.map((it) => (
        <CheckBox
          key={it.id}
          label={`${it.name} (${it.width}x${it.height})`}
          value={it.id}
          {...register(name, { required: true })}
        />
      ))}
    </div>
  );
};

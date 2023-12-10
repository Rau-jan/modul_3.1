import { v4 as uuidv4 } from 'uuid';
import { Page } from '@/components/Page';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import { useNavigate } from 'react-router-dom';
import { PageUrl } from '@/constants/urls';
import { ImageEntity } from '@/types/image';
import { useImageStore } from '@/store/images/useImagesStore';

interface FormData {
  name: string;
  width: string;
  height: string;
}

const defaultValues: FormData = { name: '', width: '128', height: '64' };

const numPattern = /^[1-9]\d+$/;

const CreateImage = () => {
  const navigate = useNavigate();
  const { addImage } = useImageStore();

  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: FormData) => {
    const id = uuidv4();

    const image: ImageEntity = {
      id,
      name: data.name,
      width: parseInt(data.width, 10),
      height: parseInt(data.height, 10),
      data: [],
    };

    addImage(image);

    navigate(PageUrl.Editor.replace(':id', id), { replace: true });
  };

  return (
    <Page title="Create new image">
      <main className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <h1>Create image</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-50">
            <Input label="Name:" autoFocus {...register('name', { required: true, minLength: 3 })} />
            <Input label="Width:" {...register('width', { required: true, pattern: numPattern })} />
            <Input label="Height:" {...register('height', { required: true, pattern: numPattern })} />
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={!isValid}>
                Save
              </button>
            </div>
          </form>
        </FormProvider>
      </main>
    </Page>
  );
};

export default CreateImage;
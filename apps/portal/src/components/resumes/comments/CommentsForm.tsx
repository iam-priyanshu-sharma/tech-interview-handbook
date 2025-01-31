import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Dialog, TextInput } from '@tih/ui';

type CommentsFormProps = Readonly<{
  setShowCommentsForm: (show: boolean) => void;
}>;

type IFormInput = {
  education: string;
  experience: string;
  general: string;
  projects: string;
  skills: string;
};

type InputKeys = keyof IFormInput;

export default function CommentsForm({
  setShowCommentsForm,
}: CommentsFormProps) {
  const [showDialog, setShowDialog] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<IFormInput>({
    defaultValues: {
      education: '',
      experience: '',
      general: '',
      projects: '',
      skills: '',
    },
  });

  // TODO: Implement mutation to database
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data));
  };

  const onCancel = () => {
    if (isDirty) {
      setShowDialog(true);
    } else {
      setShowCommentsForm(false);
    }
  };

  const onValueChange = (section: InputKeys, value: string) => {
    setValue(section, value.trim(), { shouldDirty: true });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">Add your review</h2>

      <form
        className="w-full space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Convert TextInput to TextArea */}
        <div className="mt-4 space-y-4">
          <TextInput
            {...(register('general'), {})}
            label="General"
            placeholder="General comments about the resume"
            type="text"
            onChange={(value) => onValueChange('general', value)}
          />

          <TextInput
            {...(register('education'), {})}
            label="Education"
            placeholder="Comments about the Education section"
            type="text"
            onChange={(value) => onValueChange('education', value)}
          />

          <TextInput
            {...(register('experience'), {})}
            label="Experience"
            placeholder="Comments about the Experience section"
            type="text"
            onChange={(value) => onValueChange('experience', value)}
          />

          <TextInput
            {...(register('projects'), {})}
            label="Projects"
            placeholder="Comments about the Projects section"
            type="text"
            onChange={(value) => onValueChange('projects', value)}
          />

          <TextInput
            {...(register('skills'), {})}
            label="Skills"
            placeholder="Comments about the Skills section"
            type="text"
            onChange={(value) => onValueChange('skills', value)}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            label="Cancel"
            type="button"
            variant="tertiary"
            onClick={onCancel}
          />

          <Button
            disabled={!isDirty}
            label="Submit"
            type="submit"
            variant="primary"
          />
        </div>
      </form>

      <Dialog
        isShown={showDialog}
        primaryButton={
          <Button
            display="block"
            label="OK"
            variant="primary"
            onClick={() => setShowCommentsForm(false)}
          />
        }
        secondaryButton={
          <Button
            display="block"
            label="Cancel"
            variant="tertiary"
            onClick={() => setShowDialog(false)}
          />
        }
        title="Are you sure you want to leave?"
        onClose={() => {
          setShowDialog(false);
        }}>
        <div>Note that your review will not be saved!</div>
      </Dialog>
    </>
  );
}

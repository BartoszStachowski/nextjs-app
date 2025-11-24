'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { MDXEditorMethods } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { AskQuestionSchema } from '@/lib/validations';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import TagCard from '../cards/TagCard';

// Dynamically import the Editor component to disable SSR
const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: standardSchemaResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue('tags', [...field.value, tagInput]);
        e.currentTarget.value = '';
        form.clearErrors('tags');
      } else if (tagInput.length > 15) {
        form.setError('tags', {
          type: 'manual',
          message: ' Tag should be less than 15 characters',
        });
      } else if (field.value.includes(tagInput)) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag already exist',
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue('tags', newTags);

    if (newTags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Tags are required',
      });
    }
  };

  // TODO: create handleCreateQuestion
  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10 w-full"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="border light-border-2 min-h-14 text-dark300_light700 paragraph-regular background-light700_dark300 no-focus"
                  {...field}
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Enter a clear and concise title for your question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Introduce the problem and expand on what you put in the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="border light-border-2 min-h-14 text-dark300_light700 paragraph-regular background-light700_dark300 no-focus"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-wrap flex-start gap-2.5 mt-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="mt-2.5 text-light-500 body-regular">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-16">
          <Button
            type="submit"
            className="w-fit text-light-900 primary-gradient"
          >
            Ask Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;

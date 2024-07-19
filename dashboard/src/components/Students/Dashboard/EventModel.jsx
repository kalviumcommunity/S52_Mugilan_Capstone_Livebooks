import React from 'react'
import { useNavigate } from 'react-router-dom';
import {  useCreateEventMutation } from "../../../../redux/features/calender/calenderApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const EventModal = ({ isOpen, onClose, onSubmit }) => {
    const [events, { isLoading, isSuccess, error }] = useCreateEventMutation();
    const navigate = useNavigate();
  
    const validationSchema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      meetLink: Yup.string().url("Invalid URL").required("Meet link is required"),
      date: Yup.date().required("Date is required"),
      time: Yup.string().required("Time is required"),
    });
  
    const handleSubmit = (values, { setSubmitting }) => {
      events(values)
        .unwrap()
        .then(() => {
          setSubmitting(false);
          onClose();
          navigate('/');
        })
        .catch((err) => {
          setSubmitting(false);
          // Handle error appropriately
          console.error(err);
        });
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Create Event</h2>
          <Formik
            initialValues={{ title: "", description: "", meetLink: "", date: "", time: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Meet Link</label>
                  <Field
                    type="text"
                    name="meetLink"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <ErrorMessage name="meetLink" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <Field
                    type="date"
                    name="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <Field
                    type="time"
                    name="time"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <ErrorMessage name="time" component="div" className="text-red-600 text-sm" />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {error && <div className="text-red-600 mt-2">Error: {error.message}</div>}
        </div>
      </div>
    );
  };
  
  

export default EventModal

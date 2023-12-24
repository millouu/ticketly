"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };
  const [formData, setFormData] = useState(startingTicketData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }
    router.refresh();
    router.push("/");
  };

  return (
    <div className='flex justify-center'>
      <form
        className='flex flex-col gap-1 w-1/2'
        method='post'
        onSubmit={handleSubmit}>
        <h3>Create your Ticket</h3>
        <label htmlFor=''>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label htmlFor=''>Description</label>
        <textarea
          id='description'
          name='description'
          onChange={handleChange}
          required
          value={formData.description}
          rows='5'
        />
        <label htmlFor=''>Category</label>
        <select
          name='category'
          id='category'
          value={formData.category}
          onChange={handleChange}>
          <option value='hardware'>Hardware Problem</option>
          <option value='software'>Software Problem</option>
          <option value='network'>Network Problem</option>
        </select>
        <label htmlFor=''>Priority</label>
        <div>
          <input
            type='radio'
            id='priority-1'
            name='priority'
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor=''>1</label>
          <input
            type='radio'
            id='priority-2'
            name='priority'
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor=''>2</label>
          <input
            type='radio'
            id='priority-3'
            name='priority'
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor=''>3</label>
          <input
            type='radio'
            id='priority-4'
            name='priority'
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor=''>4</label>
          <input
            type='radio'
            id='priority-5'
            name='priority'
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor=''>5</label>
        </div>
        <label htmlFor=''>Progress</label>
        <input
          type='range'
          id='progress'
          name='progress'
          value={formData.progress}
          min='0'
          max='100'
          onChange={handleChange}
        />

        <label htmlFor=''>Status</label>
        <select name='status' id='status'>
          <option value='not started'>Not Started</option>
          <option value='in progress'>In Progress</option>
          <option value='completed'>Completed</option>
        </select>
        <input type='submit' className='btn' value='Create Ticket' />
      </form>
    </div>
  );
};

export default TicketForm;

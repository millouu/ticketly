"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const router = useRouter();
  const EDITMODE = ticket._id === "new" ? false : true;

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
    status: "Not Started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progess;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className='flex justify-center'>
      <form
        className='flex flex-col gap-1 w-1/2'
        method='post'
        onSubmit={handleSubmit}>
        <h3>{EDITMODE ? "Update Your Ticket" : "Create your Ticket"}</h3>
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
          <option value='Hardware Problem'>Hardware Problem</option>
          <option value='Software Problem'>Software Problem</option>
          <option value='Network'>Network Problem</option>
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
        {/* <label htmlFor=''>Progress</label>
        <input
          type='range'
          id='progress'
          name='progress'
          value={formData.progress}
          min='0'
          max='100'
          onChange={handleChange}
        /> */}

        <label htmlFor=''>Status</label>
        <select
          name='status'
          id='status'
          value={formData.status}
          onChange={handleChange}>
          <option value='Not Started'>Not Started</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>

        <input
          type='submit'
          className='btn'
          value={`${EDITMODE ? "Update Ticket" : "Create Ticket"}`}
        />
      </form>
    </div>
  );
};

export default TicketForm;

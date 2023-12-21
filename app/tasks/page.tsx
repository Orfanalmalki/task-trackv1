"use client";

import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   stat
//   // Add more properties as needed
// }

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        const tasksData = response.data;
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId: number) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `/api/tasks`,
        data: { id: taskId }, // Send the task ID in the request body
      });

      // Access the deleted task's ID from the response
      const deletedTaskId = response.data.id;

      // Refresh the task list after deletion
      const tasksResponse = await axios.get("/api/tasks");
      const tasksData = tasksResponse.data;
      setTasks(tasksData);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="space-y-3">
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Descritption</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.ColumnHeaderCell className="space-x-2">
                  <Button color="blue">
                    <FaEdit style={{ fontSize: "20px" }} />
                  </Button>
                  <Button color="red" onClick={() => handleDelete(task.id)}>
                    <MdDelete style={{ fontSize: "20px" }} />
                  </Button>
                </Table.ColumnHeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default TasksPage;

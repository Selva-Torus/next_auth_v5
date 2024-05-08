import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const RolesAssignModal = ({
  isOpen,
  onClose,
  path,
  roles,
  mapingData,
  setMapingData,
  existingRoles,
  setExistingRoles
}) => {

  const handleAssignRoles = (e) => {
    const data = Array.from(e);
    setExistingRoles(data);
  };

  const handleUpdateChanges = () => {
    if (existingRoles && existingRoles.length) {
      const data = structuredClone(mapingData);
      var updatedObj = _.set(data, path, existingRoles);
      setMapingData(updatedObj);
      onClose()
      setExistingRoles([])
    } else {
      toast.error("Please assign one of the roles to continue");
    }
  };
  
  const handleClose = () =>{
    setExistingRoles([]);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="w-full">
      <ModalContent>
        <ModalHeader>Assign Roles</ModalHeader>
        <ModalBody>
          <Select
            label="Roles"
            placeholder="Assign roles"
            selectionMode="multiple"
            className="max-w-xs"
            selectedKeys={new Set(existingRoles)}
            onSelectionChange={handleAssignRoles}
          >
            {roles.map((role, i) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateChanges}>
            Update Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RolesAssignModal;

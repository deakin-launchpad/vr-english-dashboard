import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { EnhancedTable } from 'components';
import { API } from 'helpers';
import { notify } from 'components/index';
// import { LayoutContext } from 'contexts';
// import { OutputHelper } from 'helpers/index';

export const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);

  const mapUsersData = (usersData) => {
    usersData.map(userData => {
      userData.shoeColor = "null";
      userData.firstName = userData.userId.firstName;
      userData.lastName = userData.userId.lastName;
      userData.emailId = userData.userId.emailId;
      userData.countryCode = userData.userId.countryCode;
      userData.phoneNumber = userData.userId.phoneNumber;
      userData.isBlocked = userData.userId.isBlocked;
      userData._id = userData.userId._id;
    });
    return usersData;
  };

  const getAllUsers = useCallback(async () => {
    const users = await API.getAllUsers();
    const modifiedUsers = mapUsersData(users.data);
    setAllUsers(modifiedUsers);
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (<Grid container justify='flex-start' direction='column' alignItems='center'>
    <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
      <EnhancedTable
        data={allUsers}
        title="User Management"
        options={{
          disablePagination: false,
          maxHeight: '70vh',
          ignoreKeys: ['_id', '__v', 'userId', 'updatedAt', 'createdAt', 'isBlocked'],
          actionLocation: 'end',
          actions: [{
            name: 'Blocked',
            function: (e, data) => {
              let dataToSend = {
                userId: data._id,
                block: !data.isBlocked
              };
              if (API.toggleUserBlockStatus(dataToSend, getAllUsers)) {
                notify('User Blocked');
              }
            },
            type: 'switch',
            defaultValueFrom: 'isBlocked'
          }]
        }} />
    </Grid>
  </Grid>);
};

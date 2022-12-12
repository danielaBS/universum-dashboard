export const configGet = (url) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localUser.token}`,
    },
  };
};

export const configGetWithToken = (url) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localUser?.token}`,
    },
  };
};

export const configPost = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};
export const configPatch = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'patch',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPatchWithToken = (url, databody) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'patch',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localUser?.token}`,
    },
    data: databody,
  };
};
export const configPostFileXlsx = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="Response.xlsx"',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPostFileDocx = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.docx"',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPostFilePdf = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.pdf"',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPostDownloadXlsx = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.xlsx"',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPostDownloadZip = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'post',
    url: url,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Response.zip"',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configPut = (url, databody) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'put',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localUser.token}`,
    },
    data: databody,
  };
};

export const configDelete = (url) => {
  // const localUser = JSON.parse(localStorage.getItem('user'));
  return {
    method: 'delete',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localUser.token}`,
    },
  };
};

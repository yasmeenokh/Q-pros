export interface WorkspaceObject {
  _id: string;
  logo: any;
  name: string;
  users: User[];
}

// Interface for the array itself
export interface WorkspacesArray extends Array<WorkspaceObject> { }

export interface User {
  id: string;
  name: string;
  email: string;
}

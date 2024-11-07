import { apiSlice } from "./apiSlice";
const EMPS_URL = "/api/emps";

export const empsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmps: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/emplys/getEmplys`,
        method: "GET",
      }),
    }),

    getSingleEmp: builder.query({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/emplys/${id}`,
        method: "GET",
      }),
    }),
    
    addEmp: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/addEmp`,
        method: "POST",
        body: data,
      }),
    }),
    editEmp: builder.mutation({
      query: ({id,data}) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmp: builder.mutation({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
        method: "DELETE",
        
      }),
    }),
  }),
});

export const {
  useGetEmpsQuery,
  useGetSingleEmpQuery,
  useAddEmpMutation,
  useEditEmpMutation,
  useDeleteEmpMutation
} = empsApiSlice;

import { apiSlice } from "./apiSlice";
const EMPS_URL = "/api/emps";

export const empsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmps: builder.query({
      query: () => ({
        url: `/api/emplys/getEmplys`,
        method: "GET",
      }),
    }),

    getSingleEmp: builder.query({
      query: (id) => ({
        url: `/emplys/${id}`,
        method: "GET",
      }),
    }),
    
    addEmp: builder.mutation({
      query: (data) => ({
        url: `/api/upload/addEmp`,
        method: "POST",
        body: data,
      }),
    }),
    editEmp: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/upload/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmp: builder.mutation({
      query: (id) => ({
        url: `/api/upload/${id}`,
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

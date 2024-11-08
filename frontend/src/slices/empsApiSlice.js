import { apiSlice } from "./apiSlice";
const EMPS_URL = "/api/emps";

export const empsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmps: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/emplys/getEmplys`,
        method: "GET",
      }),
      providesTags: ["Emp"],

    }),

    getSingleEmp: builder.query({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/emplys/${id}`,
        method: "GET",
      }),
      providesTags: ["Emp"],

    }),
    
    addEmp: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/addEmp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Emp"],

    }),
    editEmp: builder.mutation({
      query: ({id,data}) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Emp"],

    }),
    deleteEmp: builder.mutation({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Emp"],

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

import { NextResponse } from "next/server";

export const NotFound = (message: string) => {
  return NextResponse.json({ error: message }, { status: 404 });
};

export const InvalidId = () => {
  return NextResponse.json({ error: "Invalid unique ID" }, { status: 400 });
};

export const InternalServerError = (message: string) => {
  return NextResponse.json({ status: 500, error: message }, { status: 500 });
};

export const BadRequest = (message: string) => {
  return NextResponse.json({ error: message }, { status: 400 });
};

export const Unauthorized = (message: string) => {
  return NextResponse.json({ error: message }, { status: 401 });
};

export const Forbidden = (message: string) => {
  return NextResponse.json({ error: message }, { status: 403 });
};

export const Conflict = (message: string) => {
  return NextResponse.json({ error: message }, { status: 409 });
};

export const Created = (data: any) => {
  return NextResponse.json(data, { status: 201 });
};

export const NoContent = () => {
  return NextResponse.json(null, { status: 201 });
};

export const Success = (data: any) => {
  const res = {
    data: data,
    message: "Success",
    status: 200,
  };
  return NextResponse.json(res, { status: 200 });
};

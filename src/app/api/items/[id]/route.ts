// Updated route.ts to make params a Promise and await it in route handlers

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const resolvedParams = await params;
    // handle GET request with resolvedParams
    return NextResponse.json({ message: 'GET request successful', params: resolvedParams });
}

export async function PATCH(request, { params }) {
    const resolvedParams = await params;
    // handle PATCH request with resolvedParams
    return NextResponse.json({ message: 'PATCH request successful', params: resolvedParams });
}

export async function DELETE(request, { params }) {
    const resolvedParams = await params;
    // handle DELETE request with resolvedParams
    return NextResponse.json({ message: 'DELETE request successful', params: resolvedParams });
}
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function DELETE() {
  try {
    const contacts = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });
    const contactsData = contacts.data?.data;

    for (const contact of contactsData || []) {
      await resend.contacts.remove({
        id: contact.id,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });
    }

    return new Response("All contacts deleted successfully");
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}

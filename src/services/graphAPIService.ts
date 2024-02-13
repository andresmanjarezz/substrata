interface Email {
  "@odata.etag": string;
  id: string; 
  subject: string;
  from: {
    emailAddress: {
      address: string;
      name: string;
    }
  };
  receivedDateTime: string;
}

interface GraphAPIResponse {
  "@odata.context": string;
  value: Email[];
}

/**
 * Fetches the last five emails from the authenticated user's Outlook inbox.
 */
export async function fetchEmails(accessToken: string): Promise<any> {
  const url = 'https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$select=subject,from,receivedDateTime&$top=5&$orderby=receivedDateTime%20DESC';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch emails: ${response.statusText}`);
    }

    const data: GraphAPIResponse = await response.json() as GraphAPIResponse;

    return data.value.map((email: Email) => ({
      sender: email.from?.emailAddress?.name || "Unknown sender",
      subject: email.subject,
      receivedDateTime: email.receivedDateTime
    }));
  } catch (error: any) {
    throw new Error(`Error fetching emails: ${error.message}`);
  }
}

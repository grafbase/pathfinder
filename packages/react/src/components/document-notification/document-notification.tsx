import type { DocumentNotificationType } from "@pathfinder-ide/stores";

import { documentNotificationClass } from "./document-notification.css";

export const DocumentNotification = ({
  notificationType,
}: {
  notificationType: DocumentNotificationType;
}) => {
  if (notificationType === "DUPLICATE_OPERATION_NAME") {
    return (
      <div className={documentNotificationClass}>
        <span>Duplicate Operation Name</span>
        <p>You have duplicate operation names in your document!</p>
      </div>
    );
  }
  if (notificationType === "ANONYMOUS_MUST_BE_ONLY_DEFINED") {
    return (
      <div className={documentNotificationClass}>
        <span>Anonymous Operation Must be Only Defined Operation</span>
        <p>Please provide a unique name for each operation in the document</p>
      </div>
    );
  }

  if (notificationType === "DISALLOW_LIVE_FOR_NON_QUERY") {
    return (
      <div className={documentNotificationClass}>
        <span>@live directive is only for query operations</span>
        <p>Remove the @live directive from your non-query operation</p>
      </div>
    );
  }

  return null;
};

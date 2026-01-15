import type { NavigateFunction } from "react-router-dom";
import type { MessageResponse } from "../types/api-types";
import type { ResultTypeFrom } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

export const responseToast = (
    res: ResultTypeFrom,
    navigate: NavigateFunction | null,
    url?: string
) => {
    if ("data" in res) {
        toast.success(res.data.message);
        if (navigate && url) navigate(url);
        return;
    }

    // error handling
    if ("error" in res) {
        const err = res.error;

        // RTK Query error
        if ("status" in err) {
            const data = err.data as Partial<MessageResponse> | undefined;
            toast.error(data?.message || "Something went wrong");
            return;
        }

        // Serialized error
        toast.error(err.message || "Something went wrong");
    }
};

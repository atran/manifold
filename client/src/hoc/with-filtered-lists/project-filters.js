export default function projectFilters({ snapshotState = false } = {}) {
  return {
    config: {
      snapshotState
    },
    params: [
      {
        label: "Search...",
        name: "keyword",
        value: ""
      },
      {
        label: "Draft",
        name: "draft",
        value: "",
        options: [
          { label: "All books", value: "" },
          { label: "Only draft books", value: "true" },
          { label: "Only published books", value: "false" }
        ]
      },
      {
        label: "Creator",
        name: "with_creator_role",
        value: "",
        options: [
          { label: "Created by anyone", value: "" },
          { label: "Created by me", value: "true" }
        ]
      },
      {
        label: "Order",
        name: "order",
        value: "updated_at DESC",
        options: [
          { label: "Most recently updated", value: "updated_at ASC" },
          { label: "Alphabetical by title", value: "sort_title ASC" },
          { label: "Newest books first", value: "created_at DESC" },
          { label: "Oldest books first", value: "created_at ASC" }
        ]
      }
    ]
  };
}

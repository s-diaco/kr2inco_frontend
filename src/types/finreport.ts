// TODO: delete file
export type FinRepResponse = {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  budget: string;
  project_manager: string;
  client_name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  team_size: number;
  project_description: string;
  project_location: string;
  project_type: ProjectType;
  project_category: ProjectCategory;
  project_duration: number;
};

export const endpoints = {
  auth: {
    profile: '/user/profile',
    authenticate: '/user/authenticate',
    social_login: '/user/social-login',
    delete_account: '/user/delete-account',
  },
  submissions: {
    submit_answers: '/submission/submit-answer',
    chat_bot: '/submission/chat-bot',
    get_daily_tasks: '/submission/get-daily-task',
    complete_task: '/submission/complete-task',
    handle_streak: '/submission/handle-streak',
  },
  weekly_plan: {
    get_week_plan: '/weekly-plan/get-week-plan',
  },
  forum: {
    get_forums: '/forum',
    get_forum: '/forum/get-forum',
    create_forum: '/forum/create-forum',
    add_comment: '/forum/add-comment',
  },
};

# Condition-Based Waiting

Replace arbitrary sleeps/timeouts in reproductions and evidence gathering with polling on an explicit condition (file state, endpoint readiness, queue drain) plus a bounded deadline. Log the condition checked, deadline, and outcome.

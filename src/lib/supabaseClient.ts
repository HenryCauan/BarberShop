import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zudljrtlvjetrvdeqdbo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZGxqcnRsdmpldHJ2ZGVxZGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDI2MzYsImV4cCI6MjA2NDExODYzNn0.ILZGIKSMhiXOfmMQIy4X2QA4N7Pp0FVcvx8LntRqhtM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			books: {
				Row: {
					author: string | null;
					created_at: string;
					description: string | null;
					fee: number | null;
					id: number;
					image_url: string | null;
					publisher: string | null;
					title: string | null;
				};
				Insert: {
					author?: string | null;
					created_at?: string;
					description?: string | null;
					fee?: number | null;
					id?: number;
					image_url?: string | null;
					publisher?: string | null;
					title?: string | null;
				};
				Update: {
					author?: string | null;
					created_at?: string;
					description?: string | null;
					fee?: number | null;
					id?: number;
					image_url?: string | null;
					publisher?: string | null;
					title?: string | null;
				};
				Relationships: [];
			};
			customers: {
				Row: {
					address: string | null;
					avatar_url: string | null;
					created_at: string;
					email: string | null;
					id: number;
					location: string | null;
					name: string | null;
				};
				Insert: {
					address?: string | null;
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					id?: number;
					location?: string | null;
					name?: string | null;
				};
				Update: {
					address?: string | null;
					avatar_url?: string | null;
					created_at?: string;
					email?: string | null;
					id?: number;
					location?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			rentals: {
				Row: {
					book_id: number | null;
					created_at: string;
					customer_id: number | null;
					end_date: string | null;
					fee: number | null;
					id: number;
					location: string | null;
					num_days: number | null;
					start_date: string | null;
					status: string | null;
				};
				Insert: {
					book_id?: number | null;
					created_at?: string;
					customer_id?: number | null;
					end_date?: string | null;
					fee?: number | null;
					id?: number;
					location?: string | null;
					num_days?: number | null;
					start_date?: string | null;
					status?: string | null;
				};
				Update: {
					book_id?: number | null;
					created_at?: string;
					customer_id?: number | null;
					end_date?: string | null;
					fee?: number | null;
					id?: number;
					location?: string | null;
					num_days?: number | null;
					start_date?: string | null;
					status?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'rentals_book_id_fkey';
						columns: ['book_id'];
						isOneToOne: false;
						referencedRelation: 'books';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'rentals_customer_id_fkey';
						columns: ['customer_id'];
						isOneToOne: false;
						referencedRelation: 'customers';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never;

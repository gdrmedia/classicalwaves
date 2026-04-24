import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_header_overlay_opacity" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_hero_header_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_hero_header_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_image_text_split_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_image_text_split_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_image_text_split_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_image_grid_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_lookbook_gallery_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_lookbook_gallery_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_editorial_quote_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_editorial_quote_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_press_strip_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_press_strip_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_signup_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_signup_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_numbered_card_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_numbered_card_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_spacer_divider_type" AS ENUM('spacer', 'divider');
  CREATE TYPE "public"."enum_pages_blocks_spacer_divider_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_spacer_divider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_spacer_divider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_header_overlay_opacity" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_header_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_header_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_split_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_split_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_split_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_image_grid_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_lookbook_gallery_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_lookbook_gallery_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_editorial_quote_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_editorial_quote_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_press_strip_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_press_strip_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_signup_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_signup_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_card_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_numbered_card_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_divider_type" AS ENUM('spacer', 'divider');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_divider_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_divider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_divider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_hero_header_overlay_opacity" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_hero_header_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_hero_header_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_rich_text_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_rich_text_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_image_text_split_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_image_text_split_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_image_text_split_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_image_grid_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_image_grid_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_lookbook_gallery_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_lookbook_gallery_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_editorial_quote_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_editorial_quote_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_testimonial_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_testimonial_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_cta_banner_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_cta_banner_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_video_embed_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_video_embed_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum_posts_blocks_spacer_divider_type" AS ENUM('spacer', 'divider');
  CREATE TYPE "public"."enum_posts_blocks_spacer_divider_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_spacer_divider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_spacer_divider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_header_overlay_opacity" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_header_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_header_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_rich_text_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_rich_text_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_image_text_split_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_image_text_split_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_image_text_split_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_image_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_image_grid_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_image_grid_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_lookbook_gallery_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_lookbook_gallery_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_editorial_quote_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_editorial_quote_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_testimonial_slider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_testimonial_slider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_banner_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_banner_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_video_embed_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_video_embed_background_type" AS ENUM('none', 'color', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_divider_type" AS ENUM('spacer', 'divider');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_divider_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_divider_padding" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_divider_background_type" AS ENUM('none', 'color', 'image');
  CREATE TABLE "pages_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"overlay_opacity" "enum_pages_blocks_hero_header_overlay_opacity" DEFAULT 'medium',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_hero_header_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_hero_header_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_rich_text_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_rich_text_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum_pages_blocks_image_text_split_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" jsonb,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_image_text_split_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_image_text_split_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_image_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_image_grid_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_image_grid_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Shop the collection',
  	"layout" "enum_pages_blocks_featured_products_layout" DEFAULT 'grid',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_featured_products_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_featured_products_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lookbook_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_lookbook_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lightbox" boolean DEFAULT true,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_lookbook_gallery_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_lookbook_gallery_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_editorial_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_editorial_quote_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_editorial_quote_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_press_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'As seen in',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_press_strip_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_press_strip_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_slider_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"location" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_testimonial_slider_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_testimonial_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_faq_accordion_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_faq_accordion_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_signup" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"body" varchar,
  	"button_text" varchar DEFAULT 'Subscribe',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_newsletter_signup_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_newsletter_signup_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get in touch',
  	"body" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_contact_form_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_contact_form_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_cta_banner_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_cta_banner_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_video_embed_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_video_embed_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_card_slider_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"heading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_numbered_card_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_numbered_card_slider_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_numbered_card_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_spacer_divider_type" DEFAULT 'spacer',
  	"size" "enum_pages_blocks_spacer_divider_size" DEFAULT 'md',
  	"anchor" varchar,
  	"padding" "enum_pages_blocks_spacer_divider_padding" DEFAULT 'md',
  	"background_type" "enum_pages_blocks_spacer_divider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"overlay_opacity" "enum__pages_v_blocks_hero_header_overlay_opacity" DEFAULT 'medium',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_hero_header_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_hero_header_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_rich_text_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_rich_text_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum__pages_v_blocks_image_text_split_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" jsonb,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_image_text_split_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_image_text_split_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_image_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_image_grid_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_image_grid_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Shop the collection',
  	"layout" "enum__pages_v_blocks_featured_products_layout" DEFAULT 'grid',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_featured_products_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_featured_products_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lookbook_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lookbook_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lightbox" boolean DEFAULT true,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_lookbook_gallery_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_lookbook_gallery_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_editorial_quote_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_editorial_quote_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_press_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'As seen in',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_press_strip_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_press_strip_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_slider_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"location" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_testimonial_slider_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_testimonial_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_faq_accordion_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_faq_accordion_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_signup" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"body" varchar,
  	"button_text" varchar DEFAULT 'Subscribe',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_newsletter_signup_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_newsletter_signup_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get in touch',
  	"body" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_contact_form_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_contact_form_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_cta_banner_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_cta_banner_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_video_embed_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_video_embed_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_numbered_card_slider_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_numbered_card_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_numbered_card_slider_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_numbered_card_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_spacer_divider_type" DEFAULT 'spacer',
  	"size" "enum__pages_v_blocks_spacer_divider_size" DEFAULT 'md',
  	"anchor" varchar,
  	"padding" "enum__pages_v_blocks_spacer_divider_padding" DEFAULT 'md',
  	"background_type" "enum__pages_v_blocks_spacer_divider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"overlay_opacity" "enum_posts_blocks_hero_header_overlay_opacity" DEFAULT 'medium',
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_hero_header_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_hero_header_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_rich_text_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_rich_text_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum_posts_blocks_image_text_split_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" jsonb,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_image_text_split_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_image_text_split_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_posts_blocks_image_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_image_grid_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_image_grid_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_lookbook_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_blocks_lookbook_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lightbox" boolean DEFAULT true,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_lookbook_gallery_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_lookbook_gallery_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_editorial_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_editorial_quote_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_editorial_quote_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonial_slider_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"location" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonial_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_testimonial_slider_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_testimonial_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_cta_banner_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_cta_banner_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_video_embed_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_video_embed_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_spacer_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_posts_blocks_spacer_divider_type" DEFAULT 'spacer',
  	"size" "enum_posts_blocks_spacer_divider_size" DEFAULT 'md',
  	"anchor" varchar,
  	"padding" "enum_posts_blocks_spacer_divider_padding" DEFAULT 'md',
  	"background_type" "enum_posts_blocks_spacer_divider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"overlay_opacity" "enum__posts_v_blocks_hero_header_overlay_opacity" DEFAULT 'medium',
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_hero_header_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_hero_header_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_rich_text_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_rich_text_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_image_text_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum__posts_v_blocks_image_text_split_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" jsonb,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_image_text_split_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_image_text_split_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__posts_v_blocks_image_grid_columns" DEFAULT '3',
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_image_grid_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_image_grid_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_lookbook_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_lookbook_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lightbox" boolean DEFAULT true,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_lookbook_gallery_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_lookbook_gallery_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_editorial_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_editorial_quote_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_editorial_quote_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonial_slider_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"location" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonial_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_testimonial_slider_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_testimonial_slider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_text" varchar,
  	"cta_url" varchar,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_cta_banner_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_cta_banner_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_video_embed_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_video_embed_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_spacer_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__posts_v_blocks_spacer_divider_type" DEFAULT 'spacer',
  	"size" "enum__posts_v_blocks_spacer_divider_size" DEFAULT 'md',
  	"anchor" varchar,
  	"padding" "enum__posts_v_blocks_spacer_divider_padding" DEFAULT 'md',
  	"background_type" "enum__posts_v_blocks_spacer_divider_background_type" DEFAULT 'none',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_header" ADD CONSTRAINT "pages_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header" ADD CONSTRAINT "pages_blocks_hero_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header" ADD CONSTRAINT "pages_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_split" ADD CONSTRAINT "pages_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_split" ADD CONSTRAINT "pages_blocks_image_text_split_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_split" ADD CONSTRAINT "pages_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid" ADD CONSTRAINT "pages_blocks_image_grid_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid" ADD CONSTRAINT "pages_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lookbook_gallery_images" ADD CONSTRAINT "pages_blocks_lookbook_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lookbook_gallery_images" ADD CONSTRAINT "pages_blocks_lookbook_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lookbook_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lookbook_gallery" ADD CONSTRAINT "pages_blocks_lookbook_gallery_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lookbook_gallery" ADD CONSTRAINT "pages_blocks_lookbook_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_quote" ADD CONSTRAINT "pages_blocks_editorial_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_quote" ADD CONSTRAINT "pages_blocks_editorial_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_press_strip" ADD CONSTRAINT "pages_blocks_press_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_press_strip" ADD CONSTRAINT "pages_blocks_press_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_slider_testimonials" ADD CONSTRAINT "pages_blocks_testimonial_slider_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_slider" ADD CONSTRAINT "pages_blocks_testimonial_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_slider" ADD CONSTRAINT "pages_blocks_testimonial_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_signup" ADD CONSTRAINT "pages_blocks_newsletter_signup_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_signup" ADD CONSTRAINT "pages_blocks_newsletter_signup_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_card_slider_cards" ADD CONSTRAINT "pages_blocks_numbered_card_slider_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_numbered_card_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_card_slider" ADD CONSTRAINT "pages_blocks_numbered_card_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_numbered_card_slider" ADD CONSTRAINT "pages_blocks_numbered_card_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_divider" ADD CONSTRAINT "pages_blocks_spacer_divider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_divider" ADD CONSTRAINT "pages_blocks_spacer_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header" ADD CONSTRAINT "_pages_v_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header" ADD CONSTRAINT "_pages_v_blocks_hero_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header" ADD CONSTRAINT "_pages_v_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_split" ADD CONSTRAINT "_pages_v_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_split" ADD CONSTRAINT "_pages_v_blocks_image_text_split_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_split" ADD CONSTRAINT "_pages_v_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid" ADD CONSTRAINT "_pages_v_blocks_image_grid_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid" ADD CONSTRAINT "_pages_v_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lookbook_gallery_images" ADD CONSTRAINT "_pages_v_blocks_lookbook_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lookbook_gallery_images" ADD CONSTRAINT "_pages_v_blocks_lookbook_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lookbook_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lookbook_gallery" ADD CONSTRAINT "_pages_v_blocks_lookbook_gallery_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lookbook_gallery" ADD CONSTRAINT "_pages_v_blocks_lookbook_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_quote" ADD CONSTRAINT "_pages_v_blocks_editorial_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_quote" ADD CONSTRAINT "_pages_v_blocks_editorial_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_press_strip" ADD CONSTRAINT "_pages_v_blocks_press_strip_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_press_strip" ADD CONSTRAINT "_pages_v_blocks_press_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_slider_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonial_slider_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonial_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_slider" ADD CONSTRAINT "_pages_v_blocks_testimonial_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_slider" ADD CONSTRAINT "_pages_v_blocks_testimonial_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_signup" ADD CONSTRAINT "_pages_v_blocks_newsletter_signup_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_signup" ADD CONSTRAINT "_pages_v_blocks_newsletter_signup_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_card_slider_cards" ADD CONSTRAINT "_pages_v_blocks_numbered_card_slider_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_numbered_card_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_card_slider" ADD CONSTRAINT "_pages_v_blocks_numbered_card_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_numbered_card_slider" ADD CONSTRAINT "_pages_v_blocks_numbered_card_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_divider" ADD CONSTRAINT "_pages_v_blocks_spacer_divider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_divider" ADD CONSTRAINT "_pages_v_blocks_spacer_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_header" ADD CONSTRAINT "posts_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_header" ADD CONSTRAINT "posts_blocks_hero_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_header" ADD CONSTRAINT "posts_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_split" ADD CONSTRAINT "posts_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_split" ADD CONSTRAINT "posts_blocks_image_text_split_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_text_split" ADD CONSTRAINT "posts_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_grid_images" ADD CONSTRAINT "posts_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_grid_images" ADD CONSTRAINT "posts_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_grid" ADD CONSTRAINT "posts_blocks_image_grid_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image_grid" ADD CONSTRAINT "posts_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_lookbook_gallery_images" ADD CONSTRAINT "posts_blocks_lookbook_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_lookbook_gallery_images" ADD CONSTRAINT "posts_blocks_lookbook_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_lookbook_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_lookbook_gallery" ADD CONSTRAINT "posts_blocks_lookbook_gallery_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_lookbook_gallery" ADD CONSTRAINT "posts_blocks_lookbook_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_editorial_quote" ADD CONSTRAINT "posts_blocks_editorial_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_editorial_quote" ADD CONSTRAINT "posts_blocks_editorial_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonial_slider_testimonials" ADD CONSTRAINT "posts_blocks_testimonial_slider_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonial_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonial_slider" ADD CONSTRAINT "posts_blocks_testimonial_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonial_slider" ADD CONSTRAINT "posts_blocks_testimonial_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_banner" ADD CONSTRAINT "posts_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_banner" ADD CONSTRAINT "posts_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed" ADD CONSTRAINT "posts_blocks_video_embed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed" ADD CONSTRAINT "posts_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_spacer_divider" ADD CONSTRAINT "posts_blocks_spacer_divider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_spacer_divider" ADD CONSTRAINT "posts_blocks_spacer_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_header" ADD CONSTRAINT "_posts_v_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_header" ADD CONSTRAINT "_posts_v_blocks_hero_header_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_header" ADD CONSTRAINT "_posts_v_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_split" ADD CONSTRAINT "_posts_v_blocks_image_text_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_split" ADD CONSTRAINT "_posts_v_blocks_image_text_split_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_text_split" ADD CONSTRAINT "_posts_v_blocks_image_text_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_grid_images" ADD CONSTRAINT "_posts_v_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_grid_images" ADD CONSTRAINT "_posts_v_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_grid" ADD CONSTRAINT "_posts_v_blocks_image_grid_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image_grid" ADD CONSTRAINT "_posts_v_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_lookbook_gallery_images" ADD CONSTRAINT "_posts_v_blocks_lookbook_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_lookbook_gallery_images" ADD CONSTRAINT "_posts_v_blocks_lookbook_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_lookbook_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_lookbook_gallery" ADD CONSTRAINT "_posts_v_blocks_lookbook_gallery_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_lookbook_gallery" ADD CONSTRAINT "_posts_v_blocks_lookbook_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_editorial_quote" ADD CONSTRAINT "_posts_v_blocks_editorial_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_editorial_quote" ADD CONSTRAINT "_posts_v_blocks_editorial_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonial_slider_testimonials" ADD CONSTRAINT "_posts_v_blocks_testimonial_slider_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonial_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonial_slider" ADD CONSTRAINT "_posts_v_blocks_testimonial_slider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonial_slider" ADD CONSTRAINT "_posts_v_blocks_testimonial_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_banner" ADD CONSTRAINT "_posts_v_blocks_cta_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_banner" ADD CONSTRAINT "_posts_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed" ADD CONSTRAINT "_posts_v_blocks_video_embed_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed" ADD CONSTRAINT "_posts_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_spacer_divider" ADD CONSTRAINT "_posts_v_blocks_spacer_divider_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_spacer_divider" ADD CONSTRAINT "_posts_v_blocks_spacer_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_header_order_idx" ON "pages_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_header_parent_id_idx" ON "pages_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_header_path_idx" ON "pages_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_header_image_idx" ON "pages_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_header_background_background_image_idx" ON "pages_blocks_hero_header" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_background_background_image_idx" ON "pages_blocks_rich_text" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_image_text_split_order_idx" ON "pages_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_split_parent_id_idx" ON "pages_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_split_path_idx" ON "pages_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_split_image_idx" ON "pages_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_text_split_background_background_imag_idx" ON "pages_blocks_image_text_split" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_image_grid_images_order_idx" ON "pages_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_images_parent_id_idx" ON "pages_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_images_image_idx" ON "pages_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_grid_order_idx" ON "pages_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_parent_id_idx" ON "pages_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_path_idx" ON "pages_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_grid_background_background_image_idx" ON "pages_blocks_image_grid" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_featured_products_order_idx" ON "pages_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_products_parent_id_idx" ON "pages_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_products_path_idx" ON "pages_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_products_background_background_ima_idx" ON "pages_blocks_featured_products" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_lookbook_gallery_images_order_idx" ON "pages_blocks_lookbook_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_lookbook_gallery_images_parent_id_idx" ON "pages_blocks_lookbook_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lookbook_gallery_images_image_idx" ON "pages_blocks_lookbook_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_lookbook_gallery_order_idx" ON "pages_blocks_lookbook_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_lookbook_gallery_parent_id_idx" ON "pages_blocks_lookbook_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lookbook_gallery_path_idx" ON "pages_blocks_lookbook_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_lookbook_gallery_background_background_imag_idx" ON "pages_blocks_lookbook_gallery" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_editorial_quote_order_idx" ON "pages_blocks_editorial_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_quote_parent_id_idx" ON "pages_blocks_editorial_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_quote_path_idx" ON "pages_blocks_editorial_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_editorial_quote_background_background_image_idx" ON "pages_blocks_editorial_quote" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_press_strip_order_idx" ON "pages_blocks_press_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_press_strip_parent_id_idx" ON "pages_blocks_press_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_press_strip_path_idx" ON "pages_blocks_press_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_press_strip_background_background_image_idx" ON "pages_blocks_press_strip" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_testimonial_slider_testimonials_order_idx" ON "pages_blocks_testimonial_slider_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_slider_testimonials_parent_id_idx" ON "pages_blocks_testimonial_slider_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_slider_order_idx" ON "pages_blocks_testimonial_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_slider_parent_id_idx" ON "pages_blocks_testimonial_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_slider_path_idx" ON "pages_blocks_testimonial_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_slider_background_background_im_idx" ON "pages_blocks_testimonial_slider" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_background_background_image_idx" ON "pages_blocks_faq_accordion" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_newsletter_signup_order_idx" ON "pages_blocks_newsletter_signup" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_signup_parent_id_idx" ON "pages_blocks_newsletter_signup" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_signup_path_idx" ON "pages_blocks_newsletter_signup" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_signup_background_background_ima_idx" ON "pages_blocks_newsletter_signup" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_background_background_image_idx" ON "pages_blocks_contact_form" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_background_background_image_idx" ON "pages_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_background_background_image_idx" ON "pages_blocks_video_embed" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_numbered_card_slider_cards_order_idx" ON "pages_blocks_numbered_card_slider_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_card_slider_cards_parent_id_idx" ON "pages_blocks_numbered_card_slider_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_card_slider_order_idx" ON "pages_blocks_numbered_card_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_numbered_card_slider_parent_id_idx" ON "pages_blocks_numbered_card_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_numbered_card_slider_path_idx" ON "pages_blocks_numbered_card_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_numbered_card_slider_background_background__idx" ON "pages_blocks_numbered_card_slider" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_spacer_divider_order_idx" ON "pages_blocks_spacer_divider" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_divider_parent_id_idx" ON "pages_blocks_spacer_divider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_divider_path_idx" ON "pages_blocks_spacer_divider" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_divider_background_background_image_idx" ON "pages_blocks_spacer_divider" USING btree ("background_image_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_blocks_hero_header_order_idx" ON "_pages_v_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_header_parent_id_idx" ON "_pages_v_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_header_path_idx" ON "_pages_v_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_header_image_idx" ON "_pages_v_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_header_background_background_image_idx" ON "_pages_v_blocks_hero_header" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_background_background_image_idx" ON "_pages_v_blocks_rich_text" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_image_text_split_order_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_split_parent_id_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_split_path_idx" ON "_pages_v_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_split_image_idx" ON "_pages_v_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_text_split_background_background_i_idx" ON "_pages_v_blocks_image_text_split" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_image_grid_images_order_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_images_parent_id_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_images_image_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_grid_order_idx" ON "_pages_v_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_parent_id_idx" ON "_pages_v_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_path_idx" ON "_pages_v_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_grid_background_background_image_idx" ON "_pages_v_blocks_image_grid" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_featured_products_order_idx" ON "_pages_v_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_products_parent_id_idx" ON "_pages_v_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_products_path_idx" ON "_pages_v_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_products_background_background__idx" ON "_pages_v_blocks_featured_products" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_images_order_idx" ON "_pages_v_blocks_lookbook_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_images_parent_id_idx" ON "_pages_v_blocks_lookbook_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_images_image_idx" ON "_pages_v_blocks_lookbook_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_order_idx" ON "_pages_v_blocks_lookbook_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_parent_id_idx" ON "_pages_v_blocks_lookbook_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_path_idx" ON "_pages_v_blocks_lookbook_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lookbook_gallery_background_background_i_idx" ON "_pages_v_blocks_lookbook_gallery" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_editorial_quote_order_idx" ON "_pages_v_blocks_editorial_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_quote_parent_id_idx" ON "_pages_v_blocks_editorial_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_quote_path_idx" ON "_pages_v_blocks_editorial_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_editorial_quote_background_background_im_idx" ON "_pages_v_blocks_editorial_quote" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_press_strip_order_idx" ON "_pages_v_blocks_press_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_press_strip_parent_id_idx" ON "_pages_v_blocks_press_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_press_strip_path_idx" ON "_pages_v_blocks_press_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_press_strip_background_background_image_idx" ON "_pages_v_blocks_press_strip" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_testimonials_order_idx" ON "_pages_v_blocks_testimonial_slider_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonial_slider_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_order_idx" ON "_pages_v_blocks_testimonial_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_parent_id_idx" ON "_pages_v_blocks_testimonial_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_path_idx" ON "_pages_v_blocks_testimonial_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_slider_background_background_idx" ON "_pages_v_blocks_testimonial_slider" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_order_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordion_background_background_imag_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_newsletter_signup_order_idx" ON "_pages_v_blocks_newsletter_signup" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_signup_parent_id_idx" ON "_pages_v_blocks_newsletter_signup" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_signup_path_idx" ON "_pages_v_blocks_newsletter_signup" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_signup_background_background__idx" ON "_pages_v_blocks_newsletter_signup" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_background_background_image_idx" ON "_pages_v_blocks_contact_form" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_background_background_image_idx" ON "_pages_v_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_background_background_image_idx" ON "_pages_v_blocks_video_embed" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_cards_order_idx" ON "_pages_v_blocks_numbered_card_slider_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_cards_parent_id_idx" ON "_pages_v_blocks_numbered_card_slider_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_order_idx" ON "_pages_v_blocks_numbered_card_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_parent_id_idx" ON "_pages_v_blocks_numbered_card_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_path_idx" ON "_pages_v_blocks_numbered_card_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_numbered_card_slider_background_backgrou_idx" ON "_pages_v_blocks_numbered_card_slider" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_spacer_divider_order_idx" ON "_pages_v_blocks_spacer_divider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_divider_parent_id_idx" ON "_pages_v_blocks_spacer_divider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_divider_path_idx" ON "_pages_v_blocks_spacer_divider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_divider_background_background_ima_idx" ON "_pages_v_blocks_spacer_divider" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX "posts_blocks_hero_header_order_idx" ON "posts_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_header_parent_id_idx" ON "posts_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_header_path_idx" ON "posts_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_header_image_idx" ON "posts_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "posts_blocks_hero_header_background_background_image_idx" ON "posts_blocks_hero_header" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_rich_text_background_background_image_idx" ON "posts_blocks_rich_text" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_image_text_split_order_idx" ON "posts_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_text_split_parent_id_idx" ON "posts_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_text_split_path_idx" ON "posts_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_text_split_image_idx" ON "posts_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "posts_blocks_image_text_split_background_background_imag_idx" ON "posts_blocks_image_text_split" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_image_grid_images_order_idx" ON "posts_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_grid_images_parent_id_idx" ON "posts_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_grid_images_image_idx" ON "posts_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "posts_blocks_image_grid_order_idx" ON "posts_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_grid_parent_id_idx" ON "posts_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_grid_path_idx" ON "posts_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_grid_background_background_image_idx" ON "posts_blocks_image_grid" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_lookbook_gallery_images_order_idx" ON "posts_blocks_lookbook_gallery_images" USING btree ("_order");
  CREATE INDEX "posts_blocks_lookbook_gallery_images_parent_id_idx" ON "posts_blocks_lookbook_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_lookbook_gallery_images_image_idx" ON "posts_blocks_lookbook_gallery_images" USING btree ("image_id");
  CREATE INDEX "posts_blocks_lookbook_gallery_order_idx" ON "posts_blocks_lookbook_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_lookbook_gallery_parent_id_idx" ON "posts_blocks_lookbook_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_lookbook_gallery_path_idx" ON "posts_blocks_lookbook_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_lookbook_gallery_background_background_imag_idx" ON "posts_blocks_lookbook_gallery" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_editorial_quote_order_idx" ON "posts_blocks_editorial_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_editorial_quote_parent_id_idx" ON "posts_blocks_editorial_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_editorial_quote_path_idx" ON "posts_blocks_editorial_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_editorial_quote_background_background_image_idx" ON "posts_blocks_editorial_quote" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_testimonial_slider_testimonials_order_idx" ON "posts_blocks_testimonial_slider_testimonials" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonial_slider_testimonials_parent_id_idx" ON "posts_blocks_testimonial_slider_testimonials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonial_slider_order_idx" ON "posts_blocks_testimonial_slider" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonial_slider_parent_id_idx" ON "posts_blocks_testimonial_slider" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonial_slider_path_idx" ON "posts_blocks_testimonial_slider" USING btree ("_path");
  CREATE INDEX "posts_blocks_testimonial_slider_background_background_im_idx" ON "posts_blocks_testimonial_slider" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_cta_banner_order_idx" ON "posts_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_banner_parent_id_idx" ON "posts_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_banner_path_idx" ON "posts_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_banner_background_background_image_idx" ON "posts_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_video_embed_order_idx" ON "posts_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_video_embed_parent_id_idx" ON "posts_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_path_idx" ON "posts_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "posts_blocks_video_embed_background_background_image_idx" ON "posts_blocks_video_embed" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_spacer_divider_order_idx" ON "posts_blocks_spacer_divider" USING btree ("_order");
  CREATE INDEX "posts_blocks_spacer_divider_parent_id_idx" ON "posts_blocks_spacer_divider" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_spacer_divider_path_idx" ON "posts_blocks_spacer_divider" USING btree ("_path");
  CREATE INDEX "posts_blocks_spacer_divider_background_background_image_idx" ON "posts_blocks_spacer_divider" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_hero_header_order_idx" ON "_posts_v_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_header_parent_id_idx" ON "_posts_v_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_header_path_idx" ON "_posts_v_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_header_image_idx" ON "_posts_v_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_hero_header_background_background_image_idx" ON "_posts_v_blocks_hero_header" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_rich_text_background_background_image_idx" ON "_posts_v_blocks_rich_text" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_image_text_split_order_idx" ON "_posts_v_blocks_image_text_split" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_text_split_parent_id_idx" ON "_posts_v_blocks_image_text_split" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_text_split_path_idx" ON "_posts_v_blocks_image_text_split" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_text_split_image_idx" ON "_posts_v_blocks_image_text_split" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_image_text_split_background_background_i_idx" ON "_posts_v_blocks_image_text_split" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_image_grid_images_order_idx" ON "_posts_v_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_grid_images_parent_id_idx" ON "_posts_v_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_grid_images_image_idx" ON "_posts_v_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_image_grid_order_idx" ON "_posts_v_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_grid_parent_id_idx" ON "_posts_v_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_grid_path_idx" ON "_posts_v_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_grid_background_background_image_idx" ON "_posts_v_blocks_image_grid" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_images_order_idx" ON "_posts_v_blocks_lookbook_gallery_images" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_images_parent_id_idx" ON "_posts_v_blocks_lookbook_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_images_image_idx" ON "_posts_v_blocks_lookbook_gallery_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_order_idx" ON "_posts_v_blocks_lookbook_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_parent_id_idx" ON "_posts_v_blocks_lookbook_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_path_idx" ON "_posts_v_blocks_lookbook_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_lookbook_gallery_background_background_i_idx" ON "_posts_v_blocks_lookbook_gallery" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_editorial_quote_order_idx" ON "_posts_v_blocks_editorial_quote" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_editorial_quote_parent_id_idx" ON "_posts_v_blocks_editorial_quote" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_editorial_quote_path_idx" ON "_posts_v_blocks_editorial_quote" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_editorial_quote_background_background_im_idx" ON "_posts_v_blocks_editorial_quote" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_testimonials_order_idx" ON "_posts_v_blocks_testimonial_slider_testimonials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_testimonials_parent_id_idx" ON "_posts_v_blocks_testimonial_slider_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_order_idx" ON "_posts_v_blocks_testimonial_slider" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_parent_id_idx" ON "_posts_v_blocks_testimonial_slider" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_path_idx" ON "_posts_v_blocks_testimonial_slider" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_testimonial_slider_background_background_idx" ON "_posts_v_blocks_testimonial_slider" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_cta_banner_order_idx" ON "_posts_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_banner_parent_id_idx" ON "_posts_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_banner_path_idx" ON "_posts_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cta_banner_background_background_image_idx" ON "_posts_v_blocks_cta_banner" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_video_embed_order_idx" ON "_posts_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_video_embed_parent_id_idx" ON "_posts_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_path_idx" ON "_posts_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_video_embed_background_background_image_idx" ON "_posts_v_blocks_video_embed" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_spacer_divider_order_idx" ON "_posts_v_blocks_spacer_divider" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_spacer_divider_parent_id_idx" ON "_posts_v_blocks_spacer_divider" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_spacer_divider_path_idx" ON "_posts_v_blocks_spacer_divider" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_spacer_divider_background_background_ima_idx" ON "_posts_v_blocks_spacer_divider" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_header" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_split" CASCADE;
  DROP TABLE "pages_blocks_image_grid_images" CASCADE;
  DROP TABLE "pages_blocks_image_grid" CASCADE;
  DROP TABLE "pages_blocks_featured_products" CASCADE;
  DROP TABLE "pages_blocks_lookbook_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_lookbook_gallery" CASCADE;
  DROP TABLE "pages_blocks_editorial_quote" CASCADE;
  DROP TABLE "pages_blocks_press_strip" CASCADE;
  DROP TABLE "pages_blocks_testimonial_slider_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonial_slider" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_newsletter_signup" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_numbered_card_slider_cards" CASCADE;
  DROP TABLE "pages_blocks_numbered_card_slider" CASCADE;
  DROP TABLE "pages_blocks_spacer_divider" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_header" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_split" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products" CASCADE;
  DROP TABLE "_pages_v_blocks_lookbook_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_lookbook_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_press_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_slider_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_signup" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_card_slider_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_numbered_card_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_divider" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_blocks_hero_header" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_image_text_split" CASCADE;
  DROP TABLE "posts_blocks_image_grid_images" CASCADE;
  DROP TABLE "posts_blocks_image_grid" CASCADE;
  DROP TABLE "posts_blocks_lookbook_gallery_images" CASCADE;
  DROP TABLE "posts_blocks_lookbook_gallery" CASCADE;
  DROP TABLE "posts_blocks_editorial_quote" CASCADE;
  DROP TABLE "posts_blocks_testimonial_slider_testimonials" CASCADE;
  DROP TABLE "posts_blocks_testimonial_slider" CASCADE;
  DROP TABLE "posts_blocks_cta_banner" CASCADE;
  DROP TABLE "posts_blocks_video_embed" CASCADE;
  DROP TABLE "posts_blocks_spacer_divider" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_header" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_image_text_split" CASCADE;
  DROP TABLE "_posts_v_blocks_image_grid_images" CASCADE;
  DROP TABLE "_posts_v_blocks_image_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_lookbook_gallery_images" CASCADE;
  DROP TABLE "_posts_v_blocks_lookbook_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_editorial_quote" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonial_slider_testimonials" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonial_slider" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed" CASCADE;
  DROP TABLE "_posts_v_blocks_spacer_divider" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_header_overlay_opacity";
  DROP TYPE "public"."enum_pages_blocks_hero_header_padding";
  DROP TYPE "public"."enum_pages_blocks_hero_header_background_type";
  DROP TYPE "public"."enum_pages_blocks_rich_text_padding";
  DROP TYPE "public"."enum_pages_blocks_rich_text_background_type";
  DROP TYPE "public"."enum_pages_blocks_image_text_split_image_side";
  DROP TYPE "public"."enum_pages_blocks_image_text_split_padding";
  DROP TYPE "public"."enum_pages_blocks_image_text_split_background_type";
  DROP TYPE "public"."enum_pages_blocks_image_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_image_grid_padding";
  DROP TYPE "public"."enum_pages_blocks_image_grid_background_type";
  DROP TYPE "public"."enum_pages_blocks_featured_products_layout";
  DROP TYPE "public"."enum_pages_blocks_featured_products_padding";
  DROP TYPE "public"."enum_pages_blocks_featured_products_background_type";
  DROP TYPE "public"."enum_pages_blocks_lookbook_gallery_padding";
  DROP TYPE "public"."enum_pages_blocks_lookbook_gallery_background_type";
  DROP TYPE "public"."enum_pages_blocks_editorial_quote_padding";
  DROP TYPE "public"."enum_pages_blocks_editorial_quote_background_type";
  DROP TYPE "public"."enum_pages_blocks_press_strip_padding";
  DROP TYPE "public"."enum_pages_blocks_press_strip_background_type";
  DROP TYPE "public"."enum_pages_blocks_testimonial_slider_padding";
  DROP TYPE "public"."enum_pages_blocks_testimonial_slider_background_type";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_padding";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_background_type";
  DROP TYPE "public"."enum_pages_blocks_newsletter_signup_padding";
  DROP TYPE "public"."enum_pages_blocks_newsletter_signup_background_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_padding";
  DROP TYPE "public"."enum_pages_blocks_contact_form_background_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_padding";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_background_type";
  DROP TYPE "public"."enum_pages_blocks_video_embed_padding";
  DROP TYPE "public"."enum_pages_blocks_video_embed_background_type";
  DROP TYPE "public"."enum_pages_blocks_numbered_card_slider_padding";
  DROP TYPE "public"."enum_pages_blocks_numbered_card_slider_background_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_divider_type";
  DROP TYPE "public"."enum_pages_blocks_spacer_divider_size";
  DROP TYPE "public"."enum_pages_blocks_spacer_divider_padding";
  DROP TYPE "public"."enum_pages_blocks_spacer_divider_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_header_overlay_opacity";
  DROP TYPE "public"."enum__pages_v_blocks_hero_header_padding";
  DROP TYPE "public"."enum__pages_v_blocks_hero_header_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_padding";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_split_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_split_padding";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_split_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_padding";
  DROP TYPE "public"."enum__pages_v_blocks_image_grid_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_layout";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_padding";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_lookbook_gallery_padding";
  DROP TYPE "public"."enum__pages_v_blocks_lookbook_gallery_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_editorial_quote_padding";
  DROP TYPE "public"."enum__pages_v_blocks_editorial_quote_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_press_strip_padding";
  DROP TYPE "public"."enum__pages_v_blocks_press_strip_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_slider_padding";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_slider_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_padding";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_signup_padding";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_signup_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_padding";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_padding";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_padding";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_numbered_card_slider_padding";
  DROP TYPE "public"."enum__pages_v_blocks_numbered_card_slider_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_divider_type";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_divider_size";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_divider_padding";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_divider_background_type";
  DROP TYPE "public"."enum_posts_blocks_hero_header_overlay_opacity";
  DROP TYPE "public"."enum_posts_blocks_hero_header_padding";
  DROP TYPE "public"."enum_posts_blocks_hero_header_background_type";
  DROP TYPE "public"."enum_posts_blocks_rich_text_padding";
  DROP TYPE "public"."enum_posts_blocks_rich_text_background_type";
  DROP TYPE "public"."enum_posts_blocks_image_text_split_image_side";
  DROP TYPE "public"."enum_posts_blocks_image_text_split_padding";
  DROP TYPE "public"."enum_posts_blocks_image_text_split_background_type";
  DROP TYPE "public"."enum_posts_blocks_image_grid_columns";
  DROP TYPE "public"."enum_posts_blocks_image_grid_padding";
  DROP TYPE "public"."enum_posts_blocks_image_grid_background_type";
  DROP TYPE "public"."enum_posts_blocks_lookbook_gallery_padding";
  DROP TYPE "public"."enum_posts_blocks_lookbook_gallery_background_type";
  DROP TYPE "public"."enum_posts_blocks_editorial_quote_padding";
  DROP TYPE "public"."enum_posts_blocks_editorial_quote_background_type";
  DROP TYPE "public"."enum_posts_blocks_testimonial_slider_padding";
  DROP TYPE "public"."enum_posts_blocks_testimonial_slider_background_type";
  DROP TYPE "public"."enum_posts_blocks_cta_banner_padding";
  DROP TYPE "public"."enum_posts_blocks_cta_banner_background_type";
  DROP TYPE "public"."enum_posts_blocks_video_embed_padding";
  DROP TYPE "public"."enum_posts_blocks_video_embed_background_type";
  DROP TYPE "public"."enum_posts_blocks_spacer_divider_type";
  DROP TYPE "public"."enum_posts_blocks_spacer_divider_size";
  DROP TYPE "public"."enum_posts_blocks_spacer_divider_padding";
  DROP TYPE "public"."enum_posts_blocks_spacer_divider_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_hero_header_overlay_opacity";
  DROP TYPE "public"."enum__posts_v_blocks_hero_header_padding";
  DROP TYPE "public"."enum__posts_v_blocks_hero_header_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_rich_text_padding";
  DROP TYPE "public"."enum__posts_v_blocks_rich_text_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_image_text_split_image_side";
  DROP TYPE "public"."enum__posts_v_blocks_image_text_split_padding";
  DROP TYPE "public"."enum__posts_v_blocks_image_text_split_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_image_grid_columns";
  DROP TYPE "public"."enum__posts_v_blocks_image_grid_padding";
  DROP TYPE "public"."enum__posts_v_blocks_image_grid_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_lookbook_gallery_padding";
  DROP TYPE "public"."enum__posts_v_blocks_lookbook_gallery_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_editorial_quote_padding";
  DROP TYPE "public"."enum__posts_v_blocks_editorial_quote_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_testimonial_slider_padding";
  DROP TYPE "public"."enum__posts_v_blocks_testimonial_slider_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_banner_padding";
  DROP TYPE "public"."enum__posts_v_blocks_cta_banner_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_video_embed_padding";
  DROP TYPE "public"."enum__posts_v_blocks_video_embed_background_type";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_divider_type";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_divider_size";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_divider_padding";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_divider_background_type";`)
}

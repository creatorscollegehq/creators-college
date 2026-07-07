import React from 'react';
import { useFormValue } from 'sanity';

export function GooglePreview() {
  const title = (useFormValue(['title']) as string) || '';
  const slugObj = useFormValue(['slug']) as { current?: string } | undefined;
  const slug = slugObj?.current || 'post-url-slug';
  const excerpt = (useFormValue(['excerpt']) as string) || '';
  const metaTitle = (useFormValue(['metaTitle']) as string) || '';
  const metaDescription = (useFormValue(['metaDescription']) as string) || '';

  // Fallbacks computation
  const displayTitle = metaTitle || (title ? `${title} | Creators College` : 'Enter post title...');
  const displayDescription = metaDescription || excerpt || 'Enter post excerpt summary to generate meta description...';
  const displayUrl = `https://www.creatorscollege.in/blog/${slug}`;

  return (
    <div style={{
      fontFamily: 'arial, sans-serif',
      padding: '16px',
      backgroundColor: '#ffffff',
      border: '1px solid #dadce0',
      borderRadius: '12px',
      maxWidth: '600px',
      textAlign: 'left',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      marginTop: '8px',
      color: '#202124'
    }}>
      {/* Site branding snippet header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#f1f3f4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
          border: '1px solid #e8eaed'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 'black', color: '#ff6b00' }}>CC</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '13px', color: '#202124', fontWeight: '500', lineHeight: '18px' }}>Creators College</span>
          <span style={{ fontSize: '11px', color: '#5f6368', lineHeight: '14px' }}>{displayUrl}</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 4px 0',
        fontSize: '20px',
        lineHeight: '1.3',
        color: '#1a0dab',
        fontWeight: '400',
        fontFamily: 'arial, sans-serif',
      }}>
        {displayTitle}
      </h3>

      {/* Snippet Description */}
      <p style={{
        margin: '0',
        fontSize: '14px',
        lineHeight: '1.57',
        color: '#4d5156',
        fontFamily: 'arial, sans-serif',
      }}>
        {displayDescription}
      </p>
    </div>
  );
}

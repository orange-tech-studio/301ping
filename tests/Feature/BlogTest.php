<?php

test('blog index lists posts newest first', function () {
    $this->get('/blog')->assertOk()->assertInertia(fn ($page) => $page
        ->component('Blog/Index')
        ->where('posts.0.slug', 'url-shortener-api'));
});

test('URL shortener API article renders its metadata and service links', function () {
    $this->get('/blog/url-shortener-api')->assertOk()->assertInertia(fn ($page) => $page
        ->component('Blog/Show')
        ->where('post.title', 'How to Use a URL Shortener API to Automate Link Creation')
        ->where('post.description', 'Learn how a URL shortener API can automate link creation for apps, campaigns, and internal tools, with practical tips for reliable integrations.')
        ->where('post.tags', ['url-shortener-api', 'link-shortener-api', 'short-link-api', 'url-shortening-service-api'])
        ->where('post.html', fn ($html) => str_contains($html, 'href="/documentation/api"'))
        ->where('post.html', fn ($html) => str_contains($html, 'href="/services/link-tags"'))
        ->where('post.html', fn ($html) => str_contains($html, 'href="/pricing"')));
});

test('blog post renders markdown with metadata', function () {
    $this->get('/blog/what-is-a-url-shortener')->assertOk()->assertInertia(fn ($page) => $page
        ->component('Blog/Show')
        ->where('post.title', 'What Is a URL Shortener? How Short Links Work')
        ->where('post.tags', ['url-shortener', 'short-links', 'link-management'])
        ->where('post.html', fn ($html) => str_contains($html, '<strong>URL shortener</strong>'))
        ->where('post.html', fn ($html) => str_contains($html, 'How 301 Ping can help')));
});

test('QR code blog post includes its explainer video', function () {
    $this->get('/blog/your-qr-code-is-forever-your-url-isnt')->assertOk()->assertInertia(fn ($page) => $page
        ->component('Blog/Show')
        ->where('post.video', '/videos/301-ping-explainer-QR-Code.mp4'));
});

test('unknown blog post returns 404', function () {
    $this->get('/blog/nope')->assertNotFound();
});

test('sitemap includes blog pages', function () {
    config(['app.url' => 'https://301p.ing']);

    $this->get('/sitemap.xml')
        ->assertSee('<loc>https://301p.ing/blog</loc>', false)
        ->assertSee('<loc>https://301p.ing/blog/what-is-a-url-shortener</loc>', false)
        ->assertSee('<loc>https://301p.ing/blog/url-shortener-api</loc>', false);
});

'use strict';

importScripts('{{ "/assets/scripts/cache-manifest.js" | add_hash }}');
importScripts('{{ "/assets/scripts/analytics.js" | add_hash }}');

self.analytics.trackingId = '';

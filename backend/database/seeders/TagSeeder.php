<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'React',
            'Vue',
            'Laravel',
            'PHP',
            'JavaScript',
            'TypeScript',
            'CSS',
            'HTML',
            'Node.js',
            'Tailwind',
            'Docker',
            'MySQL',
            'SQLite',
            'API',
            'REST',
        ];

        foreach ($tags as $tag) {
            Tag::firstOrCreate(['name' => $tag]);
        }
    }
}

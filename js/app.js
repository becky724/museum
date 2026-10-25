const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

const app = createApp({
    setup() {
        // Navigation State
        const currentPage = ref('home');
        const mobileMenuOpen = ref(false);

        // Navigation Items
        const navItems = [
            { id: 'home', name: '首页' },
            { id: 'topics', name: '核心议题' },
            { id: 'cases', name: '案例库' },
            { id: 'data', name: '学术数据' },
            { id: 'references', name: '参考资料' },
            { id: 'about', name: '关于' }
        ];

        // Case Study Categories with Icons
        const caseCategories = [
            { id: 'all', name: '全部案例', icon: '🌟' },
            { id: '文化体验', name: '文化体验', icon: '🏛️' },
            { id: '自然体验', name: '自然体验', icon: '🌿' },
            { id: '城市体验', name: '城市体验', icon: '🏙️' }
        ];

        const selectedCategory = ref('all');

        // Case Studies Data with Real Images from Unsplash
        const caseStudies = [
            {
                category: '文化体验',
                categoryIcon: '🏛️',
                icon: '🌺',
                title: '《Hosts and Guests》中的巴厘岛文化旅游案例',
                year: '1989',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
                summary: 'Valene L. Smith 在《旅游人类学》修订版中深入分析了巴厘岛文化旅游的发展历程。研究指出，当地传统仪式与舞蹈表演在旅游商业化过程中经历了"舞台化真实"的转变。游客通过参与这些精心编排的文化展示，获得了一种建构的真实性体验，而非客观的历史真实性。这一案例揭示了文化旅游中真实性的复杂性与多元性。',
                insight: '该案例表明，旅游体验中的真实性并非二元对立的客观属性，而是由东道主、游客与中介机构共同协商建构的动态过程。',
                source: 'Valene L. Smith《Hosts and Guests: the Anthropology of Tourism》（1989 修订版）'
            },
            {
                category: '文化体验',
                categoryIcon: '🎭',
                icon: '💃',
                title: '西双版纳傣族歌舞旅游的真实性感知案例',
                year: '2005',
                image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
                summary: '田美蓉与保继刚通过对西双版纳傣族园歌舞表演的实证研究发现，游客对歌舞旅游产品的真实性评判存在显著差异。研究表明，游客的教育背景、旅游动机及先验知识直接影响其对"舞台化真实"的接受程度。高学历游客更倾向于批判性地审视表演的商业化成分，而大众游客则更容易沉浸于感官体验中，形成积极的真实性感知。',
                insight: '研究揭示了真实性感知的主观性与情境依赖性，为理解旅游体验的个体差异提供了重要的实证依据。',
                source: '田美蓉、保继刚《游客对歌舞旅游产品真实性评判研究》（旅游学刊）'
            },
            {
                category: '城市体验',
                categoryIcon: '✈️',
                icon: '🗺️',
                title: '跨境自由行中的自我变革叙事',
                year: '2024',
                image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
                summary: '根据万事达卡2023-2024跨境旅游消费趋势研究报告，后疫情时代的跨境自由行呈现出明显的自我探索导向。报告显示，超过65%的自由行旅客将"寻找新的生活灵感"列为首要旅行动机。深度访谈发现，旅行者通过异文化接触、日常惯例的中断以及新社交关系的建立，经历着深刻的身份反思与价值重构过程。这种变革不仅体现在旅行期间，更延续至归国后的生活方式调整。',
                insight: '当代旅游已从单纯的休闲娱乐转向存在主义式的自我探索，旅行叙事成为个体生命故事的重要组成部分。',
                source: '2023-2024 跨境旅游消费趋势研究报告（万事达卡经济研究所）'
            }
        ];

        // Computed property for filtered cases
        const filteredCases = computed(() => {
            if (selectedCategory.value === 'all') {
                return caseStudies;
            }
            return caseStudies.filter(caseStudy => caseStudy.category === selectedCategory.value);
        });

        // References Data with Types
        const references = [
            {
                title: 'What Is a Transformative Authentic Experience?',
                authors: '多位学者',
                source: 'J-STAGE 学术期刊',
                year: '2026',
                type: '期刊论文',
                icon: '📄',
                link: '#jstage-2026-transformative-authenticity'
            },
            {
                title: 'Co-creation of experiences in tourism',
                authors: '旅游学研究团队',
                source: 'Dialnet 研究数据库',
                year: '2025',
                type: '学术文章',
                icon: '📝',
                link: '#dialnet-2025-co-creation-tourism'
            },
            {
                title: '旅游体验研究的概念、范畴与学术脉络',
                authors: '国内旅游学研究者',
                source: '万方数据',
                year: '2024',
                type: '学位论文',
                icon: '🎓',
                link: '#wanfang-2024-tourism-experience-concept'
            },
            {
                title: '符号感知下的旅游体验真实性研究',
                authors: '符号学与旅游学者',
                source: '维普期刊',
                year: '2023',
                type: '期刊论文',
                icon: '📚',
                link: '#vip-2023-symbolic-authenticity'
            },
            {
                title: 'Hosts and Guests: the Anthropology of Tourism',
                authors: 'Valene L. Smith',
                source: 'University of Pennsylvania Press',
                year: '1989',
                type: '经典著作',
                icon: '📖',
                link: '#smith-1989-hosts-guests'
            }
        ];

        // Chart initialization function with Spring Art Palette Colors
        const initCharts = () => {
            nextTick(() => {
                if (currentPage.value !== 'data') return;

                // Destroy existing charts if they exist
                if (window.consumptionChartInstance) {
                    window.consumptionChartInstance.destroy();
                }
                if (window.durationChartInstance) {
                    window.durationChartInstance.destroy();
                }

                // Chart 1: Experience Consumption Comparison - Spring Palette
                const consumptionCtx = document.getElementById('consumptionChart');
                if (consumptionCtx) {
                    window.consumptionChartInstance = new Chart(consumptionCtx, {
                        type: 'bar',
                        data: {
                            labels: ['中国', '全球平均'],
                            datasets: [{
                                label: '体验类消费占比 (%)',
                                data: [10, 12],
                                backgroundColor: [
                                    'rgba(254, 213, 214, 0.85)',  // pink-light #fed5d6
                                    'rgba(204, 232, 146, 0.85)'   // primary #cce892
                                ],
                                borderColor: [
                                    'rgba(245, 192, 193, 1)',     // pink-dark #f5c0c1
                                    'rgba(170, 203, 116, 1)'      // accent #aacb74
                                ],
                                borderWidth: 2,
                                borderRadius: 10,
                                borderSkipped: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(170, 203, 116, 0.95)',  // accent color
                                    titleColor: '#ffffff',
                                    bodyColor: '#ffffff',
                                    padding: 14,
                                    displayColors: false,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: function(context) {
                                            return `占比: ${context.parsed.y}%`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 15,
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 13, weight: '500' },
                                        callback: function(value) {
                                            return value + '%';
                                        }
                                    },
                                    grid: {
                                        color: 'rgba(204, 232, 146, 0.2)',  // primary light
                                        drawBorder: false
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 15, weight: 'bold' }
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart'
                            }
                        }
                    });
                }

                // Chart 2: Stay Duration Changes - Spring Gradient
                const durationCtx = document.getElementById('durationChart');
                if (durationCtx) {
                    window.durationChartInstance = new Chart(durationCtx, {
                        type: 'bar',
                        data: {
                            labels: ['全球平均', '亚太地区', '欧洲', '美洲', '中东非洲'],
                            datasets: [{
                                label: '停留时长延长（天）',
                                data: [1.0, 1.2, 0.8, 1.1, 2.9],
                                backgroundColor: function(context) {
                                    const chart = context.chart;
                                    const {ctx, chartArea} = chart;
                                    if (!chartArea) return null;
                                    
                                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                    gradient.addColorStop(0, 'rgba(204, 232, 146, 0.7)');      // primary
                                    gradient.addColorStop(0.5, 'rgba(254, 213, 214, 0.8)');   // pink-light
                                    gradient.addColorStop(1, 'rgba(170, 203, 116, 0.9)');     // accent
                                    return gradient;
                                },
                                borderColor: 'rgba(170, 203, 116, 1)',  // accent
                                borderWidth: 2,
                                borderRadius: 10,
                                borderSkipped: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(45, 55, 72, 0.95)',  // warm-heading
                                    titleColor: '#ffffff',
                                    bodyColor: '#ffffff',
                                    padding: 14,
                                    displayColors: false,
                                    cornerRadius: 8,
                                    callbacks: {
                                        label: function(context) {
                                            return `延长: +${context.parsed.y} 天`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 3.5,
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 13, weight: '500' },
                                        stepSize: 0.5
                                    },
                                    grid: {
                                        color: 'rgba(254, 213, 214, 0.2)',  // pink-light
                                        drawBorder: false
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: '#2d3748',  // warm-heading
                                        font: { size: 12 }
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            },
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart',
                                delay: function(context) {
                                    return context.dataIndex * 200;
                                }
                            }
                        }
                    });
                }
            });
        };

        // Watch for page changes to initialize charts when on data page
        watch(currentPage, (newPage) => {
            if (newPage === 'data') {
                setTimeout(initCharts, 150);
            }
            
            // Smooth scroll to top on page change
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });

        // Lifecycle hook
        onMounted(() => {
            // Initialize charts if starting on data page
            if (currentPage.value === 'data') {
                setTimeout(initCharts, 100);
            }

            // Add intersection observer for fade-in animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all cards after DOM is ready
            nextTick(() => {
                document.querySelectorAll('.topic-item-elegant, .case-card-elegant, .featured-card-elegant, .stat-card-elegant, .reference-card-elegant').forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            });
        });

        return {
            currentPage,
            mobileMenuOpen,
            navItems,
            caseCategories,
            selectedCategory,
            filteredCases,
            references,
            caseStudies
        };
    }
});

// Mount the Vue application
app.mount('#app');
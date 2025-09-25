// Pizza Statistics using Helius API
class PizzaStats {
    constructor() {
        this.tokenMint = '4AkCN6KLeCmUDjWLg4XyQpuZuWtwBdPcbtBQjsA2pump';
        this.heliusApiKey = '91eafa8a-99bc-4426-a43e-3e394f579cea';
        this.heliusUrl = 'https://mainnet.helius-rpc.com';
        this.init();
    }

    init() {
        this.loadStats();
        // Refresh stats every 30 seconds
        setInterval(() => this.loadStats(), 30000);
    }

    async loadStats() {
        try {
            await Promise.all([
                this.getMarketCap(),
                this.getHolderCount()
            ]);
        } catch (error) {
            console.error('Error loading pizza stats:', error);
        }
    }

    async getMarketCap() {
        try {
            // First try Helius API for price data
            const heliusMarketCap = await this.getMarketCapFromHelius();
            if (heliusMarketCap !== null) {
                const marketCapElement = document.getElementById('market-cap');
                if (marketCapElement) {
                    marketCapElement.innerHTML = '$' + this.formatNumber(heliusMarketCap);
                }
                return;
            }

            // If Helius doesn't have price data, try DEXScreener API as fallback
            const dexMarketCap = await this.getMarketCapFromDEXScreener();
            if (dexMarketCap !== null) {
                const marketCapElement = document.getElementById('market-cap');
                if (marketCapElement) {
                    marketCapElement.innerHTML = '$' + this.formatNumber(dexMarketCap);
                }
                return;
            }

            // If both fail, show "Live on DEX"
            const marketCapElement = document.getElementById('market-cap');
            if (marketCapElement) {
                marketCapElement.innerHTML = 'Live on DEX';
            }

        } catch (error) {
            console.error('Error fetching market cap:', error);
            const marketCapElement = document.getElementById('market-cap');
            if (marketCapElement) {
                marketCapElement.innerHTML = 'Live on DEX';
            }
        }
    }

    async getMarketCapFromHelius() {
        try {
            // First get token supply data
            const supplyResponse = await fetch(`${this.heliusUrl}/?api-key=${this.heliusApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'token-supply',
                    method: 'getTokenSupply',
                    params: [this.tokenMint]
                })
            });

            const supplyData = await supplyResponse.json();

            if (!supplyData.result) {
                return null;
            }

            const supply = supplyData.result.value.amount;
            const decimals = supplyData.result.value.decimals;

            // Get token price data using getAsset method
            const priceResponse = await fetch(`${this.heliusUrl}/?api-key=${this.heliusApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: '1',
                    method: 'getAsset',
                    params: {
                        id: this.tokenMint,
                        displayOptions: {
                            showFungibleTokens: true
                        }
                    }
                })
            });

            const priceData = await priceResponse.json();

            if (priceData.result && priceData.result.token_info && priceData.result.token_info.price_info) {
                const pricePerToken = priceData.result.token_info.price_info.price_per_token;

                // Calculate market cap using Helius formula
                const adjustedSupply = supply / Math.pow(10, decimals);
                const marketCap = pricePerToken * adjustedSupply;

                return marketCap;
            } else {
                return null;
            }

        } catch (error) {
            return null;
        }
    }

    async getMarketCapFromDEXScreener() {
        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${this.tokenMint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();

            if (data.pairs && data.pairs.length > 0) {
                // Get the first pair (usually the most liquid)
                const pair = data.pairs[0];
                const marketCap = parseFloat(pair.fdv || pair.marketCap);

                if (marketCap && marketCap > 0) {
                    return marketCap;
                }
            }

            return null;

        } catch (error) {
            return null;
        }
    }

    async getHolderCount() {
        try {
            // Get all token accounts for the mint
            const response = await fetch(`${this.heliusUrl}/?api-key=${this.heliusApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 'holder-count',
                    method: 'getProgramAccounts',
                    params: [
                        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // SPL Token Program ID
                        {
                            encoding: 'jsonParsed',
                            filters: [
                                {
                                    dataSize: 165 // Size of token account data
                                },
                                {
                                    memcmp: {
                                        offset: 0, // Mint address is at offset 0
                                        bytes: this.tokenMint
                                    }
                                }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data.result) {
                // Filter out accounts with 0 balance
                const holders = data.result.filter(account => {
                    try {
                        const tokenAmount = account.account.data.parsed.info.tokenAmount;
                        return tokenAmount && parseFloat(tokenAmount.amount) > 0;
                    } catch {
                        return false;
                    }
                });

                const holderCountElement = document.getElementById('holder-count');
                if (holderCountElement) {
                    holderCountElement.innerHTML = this.formatNumber(holders.length);
                }
            }
        } catch (error) {
            console.error('Error fetching holder count:', error);
            const holderCountElement = document.getElementById('holder-count');
            if (holderCountElement) {
                holderCountElement.innerHTML = 'Error loading';
            }
        }
    }

    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.round(num).toString();
    }
}

// Copy contract address function
function copyContract() {
    const contractAddress = '4AkCN6KLeCmUDjWLg4XyQpuZuWtwBdPcbtBQjsA2pump';

    if (navigator.clipboard) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showCopyNotification('Contract address copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            fallbackCopyTextToClipboard(contractAddress);
        });
    } else {
        fallbackCopyTextToClipboard(contractAddress);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification('Contract address copied to clipboard!');
        } else {
            showCopyNotification('Failed to copy address');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyNotification('Copy not supported');
    }

    document.body.removeChild(textArea);
}

function showCopyNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gold-crayola);
        color: var(--smoky-black-1);
        padding: 12px 20px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PizzaStats();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
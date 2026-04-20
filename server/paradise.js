const PARADISE_CONFIG = {
  baseUrl: 'https://multi.paradisepags.com/api/v1',
  apiKey: 'sk_442210ea27466a39a787b9cd791c0d93c3f374bfb9eea4443dd0656a319ddb23',
  sellerId: 7215,
};

class ParadisePixAPI {
  constructor(config = PARADISE_CONFIG) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.sellerId = config.sellerId;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erro HTTP ${response.status}`);
    }

    return data;
  }

  async createPixTransaction({
    amount,
    description,
    reference,
    customer,
    productHash = null,
    source = 'api_externa',
    postbackUrl = null,
    tracking = null,
    splits = [],
    orderbump = [],
  }) {
    const payload = {
      amount,
      description,
      reference,
      customer,
      source,
    };

    if (productHash) payload.productHash = productHash;
    if (postbackUrl) payload.postback_url = postbackUrl;
    if (tracking) payload.tracking = tracking;
    if (orderbump.length) payload.orderbump = orderbump;
    if (splits.length) payload.splits = splits;

    return this.request('/transaction.php', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getTransactionById(id) {
    return this.request(`/query.php?action=get_transaction&id=${id}`, {
      method: 'GET',
    });
  }

  async getTransactionByReference(reference) {
    return this.request(`/query.php?action=list_transactions&external_id=${encodeURIComponent(reference)}`, {
      method: 'GET',
    });
  }

  async getSellerData() {
    return this.request('/seller.php', {
      method: 'GET',
    });
  }

  createSplit(amountInCents) {
    return {
      recipientId: this.sellerId,
      amount: amountInCents,
    };
  }
}

module.exports = ParadisePixAPI;
